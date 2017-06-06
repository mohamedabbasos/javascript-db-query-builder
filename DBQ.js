/**
 * Aviable functions:-
 *      createTable
 *      deleteTable
 *      insert
 *      select
 *      update
 *      delete
 */
var DBQB = {
    /**
     * Build SQL Query for create table
     * @param {Object} `table`
     *                      name: ""
     *                      columns: [] // list of the columns
     *                      intColumns: [] // Columns to be integer
     *                      primaryColumns: [] // Coluns to be primary key
     *                      
     */
    createTable: function(table) {
      var query = "";
      var i, query, j, int = table.intColumns || [], uni = table.primaryColumns || [];
        query = '' + 'CREATE TABLE IF NOT EXISTS ' + table.nmae + " (";
        for (j = 0; j < table.columns.length; j += 1) {
            int = intColumns.indexOf(tables[i].columns[j]) > -1 ?
            " INTEGER" :
            "";
            uni = unique.indexOf(table.columns[j]) > -1 ?
            " PRIMARY KEY" :
            "";
            query += table.columns[j] + int + uni;
            if (j !== table.columns.length - 1) {
                query += ", ";
            } // end if
        } // end for
        query += ")";
        return query;
    },
      /**
     * Build SQL Query for drop table
     * @param {Object} `table`
     *                      name: ""
     *                      columns: [] // list of the columns
     *                      intColumns: [] // Columns to be integer
     *                      primaryColumns: [] // Coluns to be primary key
     *                      
     */
    deleteTable: function (table) {
      var query = "DROP TABLE " + table.name;
      return query;
    },
    /**
     * Build SQL Query INSERT
     * @param {String} tableName
     * @param {Object} data to insert into table in {column: vlaue} format
     * @return {Array} from two elements. 0: query with questions marks instead of values , 1: array of valus
     */
    insert: function (tableName, data) {
      var j, columns, cols, vals, realVals = [],
        returned = [];
      columns = Object.keys(data);
      cols = "(";
      vals = "(";
      for (j = 0; j < columns.length; j += 1) {
        realVals.push(data[columns[j]]);
        cols += columns[j];
        vals += "?";
        if (j !== columns.length - 1) {
          cols += ", ";
          vals += ", ";
        } else {
          cols += ")";
          vals += ")";
        } // end if
      } //end for
      returned[0] = "INSERT INTO " + tableName + " " + cols + " VALUES " + vals;
      returned[1] = realVals;
      return returned;
    },
    /**
     * Build SQL Query UPDATE
     * @param {String} tableName the table to update its data
     * @param {Object} data to update {column1: newValue, column2: newValue}
     * @param {Object} conditions to use in WHERE clause {column1: value, column2: value}
     * @return {Array} with two elements. 0: the query with question marks, 1: Array of values
     */
    update: function (tableName, data, conditions) {
      var j, i, columns, cols, realVals = [],
        returned = [];
      columns = Object.keys(data);
      cols = "";
      for (j = 0; j < columns.length; j += 1) {
        realVals.push(data[columns[j]]);
        cols += columns[j] + ' = ?';
        if (j !== columns.length - 1) {
          cols += ', ';
        } // end if
      } // end for
      // conditions
      var condsKeys = Object.keys(conditions),
        conds = "";
      for (i = 0; i < condsKeys.length; i += 1) {
        realVals.push(conditions[condsKeys[i]]);
        conds += condsKeys[i] + " = ?";
        if (condsKeys.length > 1 && i !== condsKeys.length - 1) {
          conds += " AND ";
        }
      }
      returned[0] = "UPDATE " + tableName + " SET " + cols + " WHERE " + conds;
      returned[1] = realVals;
      return returned;
    },
     /** Build SQL Query SELECT
     * @param {String} tableName the table to update its data
     * @param {Array} columns to select [column1, column2 .. etc]
     * @param {Object}  conditions (optional) to use in WHERE clause {column1: value, column2: value}
     * @return {Array} with two elements. 0: the query with question marks, 1: Array of values
     */
    select: function (tableName, columns, conditions, options) {
      var cols, conds = "",
        condsKeys, realVals = [];
      var optionsKeywords = {
        limit: "LIMIT",
        orderAsc: ["ORDER BY", "ASC"],
        orderDesc: ["ORDER BY", "DESC"]
      };
      cols = columns.length < 1 ?
        "*" :
        columns.join(", ");
      //conditions
      condsKeys = Object.keys(conditions);
      if (condsKeys.length < 1) {
        conds = "";
      } else {
        conds = " WHERE ";
        var i;
        for (i = 0; i < condsKeys.length; i += 1) {
          realVals.push(conditions[condsKeys[i]]);
          conds += condsKeys[i] + " = ?";
          if (condsKeys.length > 1 && i !== condsKeys.length - 1) {
            conds += " AND ";
          }
        }

      }
      //options
      var optionsKeys = Object.keys(options);
      var queryOptions = "";
      if (optionsKeys.length < 1) {
        queryOptions = "";
      } else {
        var j;
        for (j = 0; j < optionsKeys.length; j += 1) {
          queryOptions += " ";
          if (typeof optionsKeywords[optionsKeys[j]] === 'string') { // for LIMIT
            queryOptions += optionsKeywords[optionsKeys[j]] + " ?";
            realVals.push(options[optionsKeys[j]]);
          } else if (optionsKeywords[optionsKeys[j]] instanceof Array) { // for ORDER BY
            queryOptions += optionsKeywords[optionsKeys[j]][0] + " " + options[optionsKeys[j]] + " " + optionsKeywords[optionsKeys[j]][1];
          }
        }
      }
      var query = "SELECT " + cols + " FROM " + tableName + conds + queryOptions;
      return [query, realVals];
    },

    /***
     * Build SQL Query DELETE
     * @param {String} tableName to delete data from it
     * @param {Object} conditions to add to WHERE clause, {column: vlaue ... etc}
     * @return {Array} 0: query string and 1: for query real values.
     */
    delete: function (tableName, conditions) {
      var conds = "",
        condsKeys, realVals = [];
      //conditions
      condsKeys = Object.keys(conditions);
      if (condsKeys.length < 1) {
        conds = "";
      } else {
        conds = " WHERE ";
        var i;
        for (i = 0; i < condsKeys.length; i += 1) {
          realVals.push(conditions[condsKeys[i]]);
          conds += condsKeys[i] + " = ?";
          if (condsKeys.length > 1 && i !== condsKeys.length - 1) {
            conds += " AND ";
          }
        }

      }
      var query = "DELETE FROM " + tableName + conds;
      return [query, realVals];
    }


}