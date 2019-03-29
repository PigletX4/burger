var connection = require("../config/connection.js");

function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }

        arr.push(key + "=" + value);
      }
    }
 
    return arr.toString();
  }

var orm = {
    all: function(cb) {
        var queryString = "SELECT * FROM burgers;";
        connection.query(queryString, function(err, result) {
            if (err) {
                console.log("orm broken selectAll")
                throw err;
            }
            cb(result);
        });
    },
    create: function(cb) {
        var queryString = "INSERT INTO burgers";
        
        queryString += " (";
        queryString += cols.toString();
        queryString +=  ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        
        console.log(queryString)

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                console.log("orm broken insertOne")
                throw err;
            }

            cb(result);
        });
    },

    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                console.log("orm broken updateOne")
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;