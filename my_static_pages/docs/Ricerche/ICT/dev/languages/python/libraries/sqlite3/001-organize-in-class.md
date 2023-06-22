# Organizzare il db in una classe

filetree

```txt
main.py
db
	db.py
	init.sql
```

main.py

```python
#!/usr/bin/env python3.7
import db.db as db

mydb = db.Database()
# mydb.save_all(datas)
```

db.py

```python
import sqlite3

@dataclass
class DbObject:
    title: str
    type: str
    description: str = ""
    date: str = ""
    cost: str = ""
    contract_type: int = -1

class Database():
    db = None
    dbname = "db.db"
    def __init__(self) -> None:
        try:
            self.db = sqlite3.connect("file:{}?mode=rw".format(self.dbname), uri=True)
        except:
            self.db = sqlite3.connect(self.dbname)
            cursor = self.db.cursor()
            with open('db/init.sql', 'r') as sql_file:
                sql_script = sql_file.read()
            cursor.executescript(sql_script)
            self.db.commit()
            self.db.close()
    
    def save_all(self, objects: list[DbObject]):
    	print(objects)
```
