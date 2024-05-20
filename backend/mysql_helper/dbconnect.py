import mysql.connector

def estabilish_connection():
    con = mysql.connector.connect(host="localhost", user="root", passwd="D1y_8U-leK")
    cursor = con.cursor()
    cursor.execute("create database attendance_app")
    con.commit()

estabilish_connection()