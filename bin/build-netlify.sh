#!/bin/bash

npm run build

cd dist/docs

cat > index.html << EOF
<!DOCTYPE html>
<html>
<head><title>Slide list</title></head>
<body style="font-family: monospace;font-size:24px">
<h1>Slides listing</h1>
<ul>
EOF

for file in $(find . -name '*.slides.html' | sort); do
  echo '<li><a href="'${file:2}'">'${file:2}'</a></li>' >> index.html
done

cat >> index.html << EOF
</ul>
</body>
</html>
EOF
