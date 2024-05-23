import mysql.connector

def estabilish_connection():
    con = mysql.connector.connect(host="localhost", user="root", passwd="[ENTER_YOUR_PASSWORD]")
    cursor = con.cursor()
    cursor.execute("create database attendance_app")
    con.commit()

estabilish_connection()