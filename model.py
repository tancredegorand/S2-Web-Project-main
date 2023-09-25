import sqlite3

#------------------------------ FUNCTIONS ------------------------------#

def get_random_film():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    res = cur.execute('SELECT * FROM film ORDER BY RANDOM() LIMIT 1').fetchone()
    movie = Film(res[2], res[1], res[3], res[4])
    return movie


def get_random_film_by_difficulte(difficulte):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    res = cur.execute('SELECT * FROM film WHERE difficulte = ? ORDER BY RANDOM() LIMIT 1', (difficulte,)).fetchone()
    if res:
        movie = Film(res['id_film'], res['Image'], res['Nom'], res['Description'], res['Difficulte'])
        return movie
    else:
        return None 

def get_film_by_id(id_film):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    res = cur.execute('SELECT * FROM film WHERE id_film = ?', (id_film,)).fetchone()
    if res:
        movie = Film(res['id_film'], res['Image'], res['Nom'], res['Description'], res['Difficulte'])
        return movie
    else:
        return None

def get_difficulte():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    res = cur.execute('SELECT * FROM difficulte').fetchall()
    print(res)
    difficulte = []
    for row in res:
        difficulte.append(Difficulte(row[0]))
    return difficulte


def update_film(id_film, image, nom, description, difficulte):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    cur.execute('UPDATE film SET image = ?, nom = ?, description = ?, difficulte = ? WHERE id_film = ?', (image, nom, description, difficulte, id_film))
    connection.commit()

def get_leaderboard(limite):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    res = cur.execute('SELECT * FROM joueur ORDER BY score DESC LIMIT ?', (limite,)).fetchall()
    leaderboard = []
    for row in res:
        leaderboard.append(Joueur(row[1], row[2]))
    return leaderboard

def create_new_joueur(nom):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    cur.execute('INSERT INTO joueur (nom, score) VALUES (?, ?)', (nom, 0))
    connection.commit()


def update_score_joueur(nom, score):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    cur.execute('UPDATE joueur SET score = ? WHERE nom = ?', (score, nom))
    connection.commit()


def joueur_present(nom): 
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    cur.execute('SELECT * FROM joueur WHERE nom = ?', (nom,))
    row = cur.fetchone()
    connection.close()
    if row is not None:
        return True
    else:
        return False

    
def get_score_joueur(nom):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    cur.execute('SELECT score FROM joueur WHERE nom = ?', (nom,))
    row = cur.fetchone()
    connection.close()
    if row is not None:
        score = row['score']
        return score
    else:
        return None


def get_all_films():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    res = cur.execute('SELECT * FROM film').fetchall()
    films = []
    for row in res:
        films.append(Film(row[0], row[1], row[2], row[3], row[4]))
    return films

def create_new_film(image, nom, description, difficulte):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    cur.execute('INSERT INTO film (image, nom, description, difficulte) VALUES (?, ?, ?, ?)', (image, nom, description, difficulte))
    connection.commit()

def delete_film(id_film):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    cur.execute('DELETE FROM film WHERE id_film = ?', (id_film,))
    connection.commit()

def get_nb_films_by_difficulte(difficulte):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cur = connection.cursor()
    res = cur.execute('SELECT COUNT(*) FROM film WHERE difficulte = ?', (difficulte,)).fetchone()
    return res[0]

#------------------------------ CLASSES ------------------------------#

class Film: 
    def __init__(self, id_film, image, nom, description, difficulte):
        self.id_film = id_film
        self.image = image
        self.nom = nom
        self.description = description
        self.difficulte = difficulte

    def get_id_film(self):
        return self.id_film

    def get_nom(self):
        return self.nom

    def get_image(self):
        return self.image

    def get_description(self):
        return self.description

    def get_difficulte(self):
        return self.difficulte
    
class Joueur : 
    def __init__(self, nom, score):
        self.nom = nom
        self.score = score

    def get_nom(self):
        return self.nom

    def get_score(self):
        return self.score

class Difficulte : 
    def __init__(self, nom):
        self.nom = nom

    def get_nom(self):
        return self.nom

class Genre :
    def __init__(self, nom):
        self.nom = nom

    def get_nom(self):  
        return self.nom