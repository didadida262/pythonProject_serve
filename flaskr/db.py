import sqlite3

import click
# current_app是一个特殊对象，该对象指向处理请求的flask应用不就是当前这个应用嘛。。。。
from flask import current_app, g
from flask.cli import with_appcontext

# get_db返回一个数据库连接 
def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

def init_app(app):
    app.teardown_appcontext(close_db)   #在返回响应后进行清理的时候调用此函数
    app.cli.add_command(init_db_command)    #添加命令

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')