# How to migrate

## Solution 1

```txt
main.py
	db
		db.py
		db_migrations
			V0-INIT.sql
			V1-CREATE-something.sql
```

main.py

```python
import db.db as db
mydb = db.Database()
```

V0-init.sql

```sql
CREATE TABLE IF NOT EXISTS schema_version (
	id INTEGER PRIMARY KEY, 
    version TEXT NOT NULL UNIQUE CHECK (id = 1),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_version (id, version)
VALUES (1, "V0");
```

db.py

```python
import sqlite3
import os

@dataclass
class DbObject:
    title: str
    type: str
    description: str = ""
    date: str = ""
    cost: str = ""
    contract_type: int = -1
    
class Database():
    db: sqlite3.Connection
    dbname = "db.db"
    migration_dir_path = "db/db_migrations"
    
    def __init__(self) -> None:
        self.db = sqlite3.connect(self.dbname) # create and connect
        self.check_migration()
    
    # GENERAL ===============================================
    
    def executescript_no_output(self, sql_script: str):
        with sqlite3.connect(self.dbname) as conn:
            cursor = conn.cursor()
            cursor.executescript(sql_script)
            results = cursor.fetchall()
            for r in results:
                print(r)
    
    # MIGRATION ===============================================
    
    def get_schema_version(self) -> str:
        with sqlite3.connect(self.dbname) as conn:
            cursor = conn.cursor()
            try:
                cursor.execute('SELECT version FROM schema_version')
                results = cursor.fetchall()
                return results[0][0]
            except Exception as e:
                return "V0"

    def check_migration(self):
        version = self.get_schema_version()
        self.run_migration(version)
    
    def update_schema_version(self, version):
        print("updating schema version to {}".format(version))
        self.executescript_no_output("REPLACE INTO schema_version (id, version) VALUES (1, \"{}\")".format(version))
    
    def run_migration(self, version: str):
        print("starting migration from including {}".format(version))
        try:
            # get all files inside db_migration
            list_of_migrations_files = []
            for f in os.listdir(self.migration_dir_path):
                if os.path.isfile(os.path.join(self.migration_dir_path, f)):
                    list_of_migrations_files.append(f)
            # run all migrations after that equals version is reached
            run_migration_script_flag = False
            for f in list_of_migrations_files:
                if run_migration_script_flag or version == "V0":
                    with open(os.path.join(self.migration_dir_path, f), 'r') as sql_file:
                        print("running script: " + f)
                        sql_script = sql_file.read()
                        self.executescript_no_output(sql_script)
                    self.update_schema_version(f.split("-")[0])
                if f.split("-")[0] == version:
                    run_migration_script_flag = True
            print("migration finished successfully")
        except Exception as e:
            print(e)
            print("migration finished with error")

    # APP QUERY =======================================================

    def save_all(self, objects: list[DbObject]):
        # ok come controllo che non salvo doppioni? UNIQUE is the way
        print(objects)
```
