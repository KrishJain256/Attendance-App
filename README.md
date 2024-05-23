# Attendance App 
This app features a face recognition attendance system. It uses Python, Django and MySQL for the backend server and a client-side frontend using React and NextJS.

## The Construct
1. Python and Django along with MySQL provide a good framework for a backend server. Also, by using Django and the rest framework, I get a fantastic admin portal already built.
2. NextJS gives great support as a frontend. Using <code>axios</code> and  <code>CORS</code>, the frontend communicates with the backend server. All components in the frontend are client-side and hence is completely separate from the backend. So once, the backend server is deployed, we can use the frontend from any device anywhere provided that the backend server link in the front code is updated.
3. Tailwind CSS and shadcn/ui provide a great looking UI for the app.

## How to Run
1. Lets refer this ( the directory in which this README is located ) to be the source directory for the backend.
2. Clone the github repo in a folder
```
git clone git@github.com:KrishJain256/Attendance-App
```
3. For Django to work efficiently, running it in a virtual environment is very recommended. For that, I would recommend using PyCharm with Python 3.12 interpreter.
4. Using pip, install all the requirements
```
pip install --upgrade -r requirements.txt
```
5. Install CORS using 
```
python -m pip install django-cors-headers
```
6. Install [MySQL](https://dev.mysql.com/downloads/installer/) for your device and set it up. To verify if yu setup is proper, type in the following in any terminal <code>mysql -u root -p</code> and enter the root user password. If mysql runs successfully, then the setup is proper.
7. Setting up MySQL

Firstly, you would need to change some parameters on basis of your configuration of MySQL i.e. MySQL password.
In the <code>attendance_app/</code> directory, you will find a <code>settings.py</code> file. Onen the file and search for ( on line 86 )
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'attendanca_app',
        'USER': 'root',
        'PASSWORD': '{ENTER_YOUR_PASSWORD}',
        'HOST':'localhost',
        'PORT':'3306',
    }
}
```
Here, replace the <code>{ENTER_YOUR_PASSWORD}</code> with your actual MySQL password.
Also, in the backend/mysql_helper/ directory, you need to open dbconnect.py
```
con = mysql.connector.connect(host="localhost", user="root", passwd="{YOUR_PASSWORD}")
```
Now, we are ready to proceed further. Open a terminal in the backend/mysql_helper/ directory and type in the following to create 
```
python dbconnect.py estabilish_connection
```
Open a terminal in the source directory and type in following commands to complete the MySQL setup.
```
python manage.py makemigrations
```
```
python manage.py migrate
```
8. To run the MySQL server, type in the following
```
python manage.py runserver
```
9. Now, lets start up the frontend

Firstly, you should have yarn installed and setup globally on your PC to run it locally. For this refer to [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-the-yarn-package-manager-for-node-js)

Head into the <code>frontend/my-app/</code> directory and open a terminal there. Now setup the frontend by typing the following in the terminal.
```
yarn install
```
10. Let's run the frontend now. In the same terminal type in 
```
yarn run dev
```

So, by doing all these steps, we start 2 local servers.
Backend at <code>https://localhost:8000/</code>
and the frontend at <code>https://localhost:3000/</code>

## Accessing the Admin portal
The main admin portal is located at <code>https://localhost:8000/admin/</code>. It has been built automatically by Django.
The secondary admin portal is built by Django Rest Framework and is distributed into links.
```
# For Viewing and adding Students
https://localhost:8000/attendance_app/

# For Viewing and adding Attendance
https://localhost:8000/attendance_app/attendance/         

# Nearly a replica of the first link but the extra Profile Picture attributes for marking attendance
https://localhost:8000/attendance_app/mark/ 
```
### Note:
To run the frontend successfully, you must add some sample data using the admin portal or else, the frontend might misbehave due to lack of data.
### How to enter data
All fields except for the courses field and the Pfp field are quite generic.

##### For Courses:
Enter a JSON like:
If you want a student to have the courses MTH113, CHM112 and PHY114
Enter into the field:
```
{
    "course0":"MTH113",
    "course1":"CHM112",
    "course2":"PHY114"
}
```
You can also choose to enter it in the same line. The above view is just for ease.

##### For Pfp:
If the name of the Image file is <code>id-card-230572.jpeg</code>
Then enter into the field, <code>/pfps/id-card-230572.jpeg</code>

### Caution: 
The face detection model works best with photos of portrait view with face in the center. Please refrain from using images in landscape mode or with face in the corner. And also, for best results, face the camera while taking the photo.


## Accessing the User Portal
The user portal would be at <code>https://localhost:3000/</code> 
This page is a login page. After login, you will be redirected to the dashboard which shows the attendance. Also, the rendering the pages might be slow in the first run, so please wait till the system builds cache locally to make things fast and smooth.

### Caution:
While setting up the frontend, refrain from using <code>npm</code>, since the @mediapipe/face-detection module isnt available in the npm library. Using Yarn helps to efficiently build the root files and maintaining the dependency tree.