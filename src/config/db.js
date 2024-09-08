import mysql from "mysql2";
import Sequelize, { DataTypes } from "sequelize";
const sequelize=new Sequelize('userlogin','root','root_123',{
    host:"localhost",
    port:"3306",
    dialect:"mysql"
});
const checkconnect= async()=>{
    try{
        await sequelize.authenticate();
        console.log("connected")
    }catch(err){console.log(err)}
}
checkconnect();
const myuser=sequelize.define('myuser',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }

});
myuser.sync();
export {checkconnect,myuser};