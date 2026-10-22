72ITDS30103 · Week 5 · Lab 3 starter

Use this ONLY if your team does not have a working Dockerfile from Lab 2 and the
Week 4 practice. Lab 3 is about the platform, not about repairing a broken build.

Pick ONE folder, the language your team wants to use:
  python-fastapi/   Python + FastAPI   (matches the code in the Lab 3 handout)
  node-express/     Node.js + Express

Copy everything inside that folder into your team repository, including the hidden
files .dockerignore, .gitignore and .env.example, commit and push, then follow
README.md in that folder.

What is already done:      Dockerfile (named exactly that), .dockerignore,
                           binds to 0.0.0.0, reads DATABASE_URL, /health/db,
                           compose.yml for the local stack, no secret in the repo.
What Lab 3 still asks you: Task A (read PORT, add /health) and Tasks B to F.

Both apps listen on port 8000 locally.
