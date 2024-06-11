

# Interview-Schedule-Portal



## Description
I began constructing a "Interview Portal" HomePage from which the administrator may browse the List of Interviews and 
also add a new interview by clicking the "Create an Interview" button. This will take the admin to a new page where he can enter the interview's name and time slot.


I had considered 11 candidates data, which I had divided depending on slots and companies. I'm going to demonstrate an error by assigning a candidate to a slot where 
he or she is also participating in an interview with another company (this throws an error showing the candidate is scheduled in an other interview in the same slot). 
If a slot has just one candidate for the interview, the status of the interview will be presented as cancelled on the Interviews List Page.


## DataBase Schema 

The data I considered with attributes namely name,email,mobile,companyId,slot and status is stored in the database.
CompanyId in this case simply refers to the names of the companies with which we plan to display a scheduling error 
that prevents a candidate from being scheduled for an interview with another company within the same time frame.

If there are less than two participants in the same time slot, the status will read "Cancelled" (as per given requirement mentioned in the problem statement).
If there are more than two participants, the status will read "Scheduled on Time."

I have divided the slots as follows:
slot-1:9:00-9:45
slot-2:10:00-10:45
slot-3:11:00-11:45
slot-4:12:00-12:45

## How to run
Download the zip file of whole source code and extract it.
Make sure node and MongoDB local server are installed on your system.
Start your mongoDB server.
Go to the Project Folder and run the command node app.js on your terminal.
Go to http://localhost:3000/ on any browser.











