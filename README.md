# javascript-db-query-builder
Just another SQL query build for using JavaScript

# Installation

Include the `DBQ.js` file in your page.

# functions

* `DBQ.createTable(table)` `table` {object}  
        
      {
          name: 'table_name', // The name of the talbe
      
          columns: [] // list of the columns
      
          intColumns: [] // Columns to be integer
      
          primaryColumns: [] // Coluns to be primary key  
      }
 
* `DBQ.deleteTable(table)` `table` {object}  
        
      {
          name: 'table_name', // The name of the talbe
      }
    
   
* `DBQ.insert(tableName, data)` `tableName` {string} , data {object}
        
      {
          column: vlaue,
          column: vlaue,
          .. etc
      }
