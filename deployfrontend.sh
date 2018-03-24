rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "Compiles assets for Github Pages"
git push -u origin2 master
