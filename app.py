import sqlite3
from model import *
from flask import Flask , render_template, request
from flask import current_app, flash, jsonify, make_response, redirect, request, url_for
app = Flask(__name__, template_folder='templates', static_folder='static')

liste = []

@app.route('/')
def index():
    leaderboard = get_leaderboard(10)
    return render_template('index.html', leaderboard = leaderboard)

@app.route('/game')
def game():
    liste.clear()
    difficulte = get_difficulte()
    return render_template('game.html',levels=difficulte)

@app.route('/api/getfilm/<string:level>', methods=['GET'])
def getFilm(level):
    film = get_random_film_by_difficulte(level)
    while (film.id_film in liste):
        film = get_random_film_by_difficulte(level)
    print(film)
    if film:
        film_dict = {
            'id_film': film.id_film,
            'Image': film.image,
            'Nom': film.nom,
            'Difficulte': film.difficulte,
            'Description': film.description
        }
        liste.append(film.id_film)
        return jsonify(film_dict)
    else:
        return jsonify({'error': 'No film found for the given difficulty level.'}), 404
    


@app.route('/api/score', methods=['POST'])
def handle_score():
    data = request.json
    nom = data['nom']
    score = data['score']
    #si joueur non existant 
    if (joueur_present(nom)==False):
        create_new_joueur(nom)

    if (score > get_score_joueur(nom)):
        update_score_joueur(nom, score)


@app.route('/adminview')
def adminview():
    films = get_all_films()
    nbFilmsFacile = get_nb_films_by_difficulte('facile')
    nbFilmsNormale = get_nb_films_by_difficulte('normale')
    nbFilmsDifficile = get_nb_films_by_difficulte('difficile')
    return render_template('adminview.html', films=films, nbFilmsFacile=nbFilmsFacile, nbFilmsNormale=nbFilmsNormale, nbFilmsDifficile=nbFilmsDifficile, levels=get_difficulte())

@app.route('/api/get_all_film')
def films():
    liste_film = []
    films = get_all_films()
    for film in films:
        film_dict = {
            'id_film': film.id_film,
            'Image': film.image,
            'Nom': film.nom,
            'Difficulte': film.difficulte,
            'Description': film.description
        }
        liste_film.append(film_dict)
    return jsonify(liste_film)


@app.route('/adminview/edit/<string:id_film>')
def edit(id_film):
    film = get_film_by_id(id_film)
    return render_template('update.html', film=film)


@app.route('/adminview/update', methods=['POST'])
def update():
    data = request.json
    id_film = data['id_film']
    nom = data['nom']
    image = data['image']
    difficulte = data['difficulte']
    description = data['description']
    update_film(id_film, image, nom, description, difficulte)
    return redirect(url_for('adminview'))

@app.route('/adminview/create')
def create():
    return render_template('create.html')
    
@app.route('/adminview/add', methods=['POST'])
def add():
    data = request.json
    print(data)
    nom = data['nom']
    image = data['image']
    difficulte = data['difficulte']
    description = data['description']
    create_new_film(image, nom, description, difficulte)
    return redirect(url_for('adminview'))

@app.route('/adminview/delete', methods=['POST'])
def delete():
    data = request.json
    id_film = data['id_film']
    delete_film(id_film)
    return redirect(url_for('adminview'))