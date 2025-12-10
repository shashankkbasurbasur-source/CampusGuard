cd backend
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
python run.py

cd frontend
npm install
npm run dev

Built the frontend locally (npm run build)

A dist/ folder was created

You copied the files from dist and paste to static

git add .
git commit -m "Updated CampusGuard prototype"
git push