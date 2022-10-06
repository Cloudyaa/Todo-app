const {ValidationError} = require("../utils/errors");
const {ObjectId} = require("mongodb");
const {todos} = require("../utils/db");


class TodoRecord {
    constructor(obj) {
        this._id = ObjectId(obj._id);
        this.taskName = obj.taskName;
        this.createdAt = obj.createdAt;
        this._validate();
    }

    _validate(){
        if(this.taskName.trim().length < 5){
            throw new ValidationError('Todo name should be at least 5 characters.');
        }

        if(this.taskName.length > 150){
            throw new ValidationError('Todo name should be less than 150 characters.');
        }
    }

    async insert(){
        const {insertedId} = await todos.insertOne({
            _id: this._id,
            taskName: String(this.taskName),
            createdAt: this.createdAt,
        });
        this._id = insertedId;

        return insertedId;
    }

    async delete(){
        await todos.deleteOne({
            _id: this._id,
        });
    }

    static async find(id){
        const item = await todos.findOne({_id: ObjectId(String(id))});
        return item === null ? null : new  TodoRecord(item);
    }

    static async findAll(){
        const result = await todos.find();
        const resultArray = await result.toArray();
        return resultArray.map(obj => new TodoRecord(obj));
    }

    static async findAllWithCursor(){
        return todos.find();
    }

    async update(){
        await todos.updateOne({
            _id: this._id,
        }, {
            $set : {taskName: String(this.taskName)},
        });
    }
}

module.exports = {
    TodoRecord,
}
