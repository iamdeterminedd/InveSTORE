# InveSTORE

An inventory management system that helps businesses manage their inventory.

## Goal

I created this app to assist my family in our business by tracking and monitoring the levels of stock of items in the store. This way, they do not need to strain their minds to remember which items need restocking, and it prevents them from repeatedly writing long lists of items.

## Installation

#### Backend Directory:

1. **Create Virtual Environment:**

   ```shell
   python -m venv .venv
   ```

2. **Activate Virtual Environment:**

   ```shell
   . .venv/bin/activate
   ```

3. **Install Requirements:**

   ```shell
   pip install -r requirements.txt
   ```

4. **Database Setup:**

   - Insert your database in the project directory.

5. **Configure Database in Project Directory Settings:**

   - Navigate to the project directory settings and configure your database settings.

6. **Environment Variables:**

   - Insert a `.env` file with all the secret keys needed:

   ```
   SECRET_KEY=your_own_secret_key
   DEBUG=your_own
   ORIGINS=http://your_own_origins
   ```

7. **Run Migrations:**

   ```shell
   python manage.py makemigrations
   ```

8. **Apply Migrations:**

   ```shell
   python manage.py migrate
   ```

9. **Run the Server:**
   ```shell
   python manage.py runserver
   ```

#### Frontend Directory:

1. **Install Dependencies:**

   ```shell
   npm install
   ```

2. **Environment Variables:**

- Create a `.env` file in the frontend directory.
- Insert the API base endpoint in the `.env` file as follows:

  ```
  VITE_REACT_BASE_URL='http://your-api-base-url.com'
  ```

3. **Run the Client:**
   ```shell
   npm run dev
   ```
