import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost', # Change if using a cloud DB like PlanetScale/Aiven
            database='transitops',
            user='root',
            password='khushi2506' 
          
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None