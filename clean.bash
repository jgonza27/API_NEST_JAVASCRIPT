#!/bin/bash

echo "🧹 Eliminando Prisma por completo del proyecto..."

# 1. Borrar carpeta prisma/
if [ -d "prisma" ]; then
  rm -rf prisma
  echo "✔ Carpeta prisma/ eliminada"
else
  echo "ℹ No existe la carpeta prisma/"
fi

# 2. Borrar cliente Prisma en node_modules/.prisma
if [ -d "node_modules/.prisma" ]; then
  rm -rf node_modules/.prisma
  echo "✔ Carpeta node_modules/.prisma eliminada"
else
  echo "ℹ No existe node_modules/.prisma"
fi

# 3. Borrar archivo prisma.config.ts si existe
if [ -f "prisma.config.ts" ]; then
  rm prisma.config.ts
  echo "✔ prisma.config.ts eliminado"
else
  echo "ℹ No existe prisma.config.ts"
fi

# 4. Borrar archivo .env si está dentro de prisma/ o raíz
if [ -f ".env" ]; then
  rm .env
  echo "✔ Archivo .env eliminado"
else
  echo "ℹ No existe archivo .env"
fi

# 5. Desinstalar Prisma de node_modules y package.json
npm uninstall prisma @prisma/client
echo "✔ Prisma desinstalado del proyecto"

echo "🎉 Limpieza completa. Puedes volver a iniciar Prisma con:"
echo "   npx prisma init"
