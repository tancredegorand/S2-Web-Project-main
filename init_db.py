import sqlite3

connection = sqlite3.connect('database.db')


with open('film.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO DIFFICULTE (nom) VALUES (?)",
            ("Simple",)
            )

cur.execute("INSERT INTO JOUEUR (Nom,score) VALUES (?, ?)",
            ("Nullos","15000")
            )

connection.commit()
connection.close()