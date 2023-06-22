# Some sql code

## filter by the length of the record

```sql
SELECT `name` 
FROM table1 
WHERE LENGTH(`name`) < 6 
ORDER BY SUBSTRING_INDEX(domain, '.', -1)  /* -1 mean the last char of the string */
```
