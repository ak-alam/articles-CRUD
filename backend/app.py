import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
# from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS

db_endpoint = os.environ['MYSQL_DB_HOST']
db_user = os.environ['MYSQL_DB_USER']
db_password = os.environ['MYSQL_DB_PASSWORD']
db_name = os.environ['MYSQL_DB_NAME']

# db_endpoint=os.environ['db_endpoint']
# db_user=os.environ['db_user']
# db_password=os.environ['db_password']
# db_name=os.environ['db_name']



# db_endpoint = "127.0.0.1"
# db_endpoint="db"
# db_user = "user"
# db_password = "password"
# db_name = "db"

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{db_user}:{db_password}@{db_endpoint}/{db_name}'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@127.0.0.1/db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


print(f'mysql://{db_user}:{db_password}@{db_endpoint}/{db_name}')
db = SQLAlchemy(app)
ma = Marshmallow(app)
# migrate = Migrate(app, db)


#DB table
class Articles(db.Model):

    __tablename__ = "articles"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


#DB schema
class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')

artcile_schema = ArticleSchema() #single article
artciles_schema = ArticleSchema(many=True) #query set


#Routes
@app.route('/', methods = ['GET'])
def health_checl():
    results = {"message": "Server is up and running"}
    return jsonify(results)



@app.route('/get', methods = ['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = artciles_schema.dump(all_articles)
    return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def article_details(id):
    article = Articles.query.get(id)
    return artcile_schema.jsonify(article)

@app.route('/add/', methods = ['POST'])
def add_article():
     title = request.json['title']
     body = request.json['body']
     articles = Articles(title, body)
     db.session.add(articles)
     db.session.commit()
     return artcile_schema.jsonify(articles)

@app.route('/update/<id>/', methods = ['PUT'])
def update_article(id):
    article = Articles.query.get(id)

    title = request.json['title']
    body = request.json['body']

    article.title = title
    article.body = body

    db.session.commit()
    return artcile_schema.jsonify(article)
                            
@app.route('/delete/<id>/', methods = ['DELETE'])
def article_delete(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return artcile_schema.jsonify(article)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)