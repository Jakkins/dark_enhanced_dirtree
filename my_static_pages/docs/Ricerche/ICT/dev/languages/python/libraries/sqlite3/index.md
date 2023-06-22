# Index

```python
"""
1. it is good practice to always close the connection to an SQLite database when you are done working with it
    - use "with" statement to close the connection automatically
2. commit() is used to commit the current transaction to the database
    - transactions are automatically committed when the cursor is closed
    - if you have made a series of changes to the database you can use conn.commit() to ensure that the changes are permanently saved to the database
3. cursor.execute is used to execute a single SQL statement at a time
4. cursor.executescript is used to execute multiple SQL statements at once
"""
```
