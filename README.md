# DevTinder

- Created a Vite + React app
- Remove unnecessary files/code and create a Hello World app
- install tailwind css
- install daisy ui
- add Navbar component to app.jsx (add button to toggle theme and functionality)
- (lucide-react for icons)
- create a NavBar.jsx separate component file

- Install react-router-dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body component (for child routes)
- Create a footer component (fixed bottom-0) (so everything lies in between the header and footer)

- Create a Login.jsx component
- install axios
- CORS - install cors in backend ==> add middleware with the configurations: origin: \*\*\*\*, credentials: true
- whenever you are making an API call so pass axios ==> {withCredentials: true}, (if we don't pass it, the BE will not send the token back in the other api-calls)

-- Install react-redux + @reduxjs/toolkit -> https://redux-toolkit.js.org/tutorials/quick-start

- then configureStroe => Provider (in App.jsx) => createSlice (export reducer & actions) => add \*\*\*Slice to the store

- Add Redux-devTools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants (BE-URL) file + create a componenents folder

- You should not be access other routes without login
- If token is not present. redirect user to login page
- Logout Feature
- Get the feed and add the feed in the store
- build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile

- New Page: See all my Connections
- New Page: See all my Connection Requests
- Feature: Accept/Reject Connection Request
- Send/ignore the user card from feed
  -Signup New User
- E2E Testing

# Deployment

- SignUp on AWS
- Launch EC2 instance (connect via SSH Client)
- chmod 400 <secret-key>.pem (for to modify the permissions of the key)
- scp -i <secret-key>.pem <Machine-address>
- (now we are on to the terminal of the EC2 instance/machine)
- Install Node version 18.17.1 (where your app working fine right now)
- git clone the FE & BE repositories to the EC2 instance

- Frontend (cd to FE folder)

  - npm install (installs dependencies)
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx (nginx is a web server, creates a http server on port 80)
  - sudo systemctl enable nginx (now nginx is up and running)
  - Copy Code from dist(build files) to /var/www/html i.e
  - sudo scp -r dist/\* /var/www/html  
    (sudo-->root-level permission, scp-->secure copy, -r-->recursively , from & to paths)
  - Enable port :80 of your EC2-Instance in security group
    (we have to add Inbound-rule for port 80 for to access it)

- Backend

  - npm install
  - (create and update the .env file in the BE folder of remote machine) (ctrl+o -> save, + Enter + ctrl_x -> exit)

  - allowed EC2 instance public IP on mongodb server (whitelisting)
  - add in-Bound rule for the BE-Port also
  - npm install pm2 -g
  - pm2 start npm --name "devTinder-backend" -- start (cd to BE folder)
  - pm2 logs (to check the logs)
  - pm2 flush <Process_Name> -> for to clear the logs
  - pm2 list (list of processes), pm2 stop <Process_Name>, pm2 delete <Process_Name>

# nginx config :

Frontend => http://13.60.18.132/
Backend => http://13.60.18.132:7777/

Domain name = devtinder.com ==> 13.60.18.132

Frontend = devtinder.com
Backend = devtinder.com:7777 (? do we really want this ) (bst pract is mapping to ) ==> devtinder.com/api

(for this mapping we use nginx)

- config nginx -> sudo nano /etc/nginx/sites-available/default (copy paste below config)
- (after configuring nginx)
  ubuntu@ip-172-31-32-233:~$ sudo nginx -t
  nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
  nginx: configuration file /etc/nginx/nginx.conf test is successful
- restart nginx -> sudo systemctl restart nginx
- modify the BASE_URL in the .env file in FE-project to "/api"
  -- you need to re-build and copy the files again (same process & commands of FE)

nginx config :

      server_name 13.60.18.132;

      location /api/ {
         proxy_pass http://localhost:7777/;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
      }

---

# Adding a custom Domain name

- purchased domain-name from godaddy(godaddy is the registrar)

- signup on cloudflare & add a new domain name (that gives nameServers, if nameServers are of CloudFlare, so cloudFlare will manage the DNS-records of the domain-name)

- change the name servers on godaddy by point it to cloudflare

- wait for sometime till your name servers are updated (in cloudflare) (now whole Domain-name is managed by CloudFlare) (15 mins)

  (Q) why using cloudflre? why not to use name-servers of Godaddy?

      (A)    cloudflare give free SSL (https) & it is  a CDN (content delivery network) (it is also a caching server) whereas godaddy is a registrar (it is not a caching server)

- DNS record: A -> devtinder.in (ip-address of the EC2 instance)

- Enable flexible SSL for website (HW: Q-> How to enable Full-SSS? )

# Sending Emails via SES

    - Create a IAM user
    - Give Access to AmazonSES FullAccess
    - Amazon SES : Create an Identity
    - Verify the domain name
    - Verify the email address Identity (mandatory)

    - Install AWS SDK - v3

    - Code Examples:

        (https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples)

        (https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_ses_code_examples.html)

    - Setup SesClient
    - Access Credentials should be created in IAM (in security credentials tab of a IAM-User)
    - add the credentials to the env file
    - Write code for SESClient
    - Write code for Sending email address
    - Make the email dynamic by passing more params to the run function

# Scheduling cron-jobs in NodeJS

- Install node-cron
- Learn about cron-expression syntax - crontab.guru
- Schedule a job
- date-fns
- Find all the unique emailIds who have got connection-requests in previous day
- Send email to those users
- Explore: Queue-mechanisn to send bulk-emails
- Amazon SES Bulk-emails
- Make sendEmail function dynamic (use a templare for sending email)
- bee-queue & bull (queue-mechanism npm-packages)

---

# Razorpay Payment Gateway Integration

    - Sign up on Razorpay & complete KYC

---

# Reql Time Chat using WebSocket (Socket.io)

    - Build th UI for a chat window on /chat/:targetUserId
    - Setup socket.io in backend
    - npm i socket.io
    - npm i socket.io-client
    - Initialize the chat
    - Create a socket connection
    - Create room for the chat
    - Listen to events
    - Emit events
    - Receive emitted messages in the UI
    - Send messages...

    - HOME WORK:  Fix Security Bug:  -- auth in web sockets
    - HOME WORK:  feat: Show Green Symbol if user is online???? - [last seen 2 hours ago]..
    - HOME WORK:  Limit messages when fetching from DB
    - Project Ideas: Tic Tac Toe game
    - Project Idea 2: Chess game
    - Project Idea 3: TypeRacer game


---

# Component Design

- Body (component)
  -NavBar
  Route=/ => Feed
  Route=/login => Login
  Route=/connections => Connections
  Route=/profile =? => Profile
