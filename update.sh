git add --all
timestamp=$(date +%s)
git commit -m $timestamp
git push origin master
