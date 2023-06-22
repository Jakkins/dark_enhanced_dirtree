# Basic setup

filetree

```txt
main.py
db
	db.py
	init.sql
```

main.py

```python
import db.db as db

if __name__ == "__main__":
    db.setup_db()
```

db.py

```python
import sqlite3

dbname = "db.db"

def setup_db():
    db = None
    try:
        db = sqlite3.connect("file:{}?mode=rw".format(dbname), uri=True)
    except:
        db = sqlite3.connect(dbname)
        cursor = db.cursor()
        with open('db/init.sql', 'r') as sql_file:
            sql_script = sql_file.read()
        cursor.executescript(sql_script)
        db.commit()
        db.close()
```

init.sql

```sql
CREATE TABLE contacts (
 contact_id INTEGER PRIMARY KEY,
 first_name TEXT NOT NULL,
 last_name TEXT NOT NULL
);

INSERT INTO contacts (contact_id, first_name, last_name)
VALUES (1, 'John', 'Smith');
```
