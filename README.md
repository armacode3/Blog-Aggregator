Make sure to make a `~/.gatorconfig.json` file with this structure and fill in your own db_url:
```
{
    "db_url": "postgres://example"
}
```

### Commands:

`npm run start login <username>`
switches user to given username if in users db.

`npm run start register <username`
Adds user to users db if not in the db already.

`npm run start reset`
Truncates the users db to get rid of all users.

`npm run generate`
Generates db

`npm run migrate`
Migrates db
