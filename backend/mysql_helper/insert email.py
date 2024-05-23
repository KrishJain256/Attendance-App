import mysql.connector
con = mysql.connector.connect(host = "localhost",user = "root",passwd = "[yourpassword]",database="attendance_app")
cursor = con.cursor()

while True:
    f_name = input("Enter fname : ")
    l_name = input("Enter lname : ")
    passwd = input("Enter passwd : ")
    mail = input("Enter mail : ")
    rollno = int(input("Enter rollno : "))


    query = "Insert into backend_student (firstname,lastname,password,email,rollno) values('{}','{}','{}','{}',{})".format(f_name,l_name,passwd,mail,rollno)
    cursor.execute(query)
    con.commit()

    if cursor.rowcount > 0:
        print("Data inserted")
    else:
        print("No Data Found. Some error!")
