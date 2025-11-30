
IMAGE_NAME="service-booking"
DOCKERHUB_USER="phatdat782004"
TAG="latest"

echo "🚀 Building Docker image..."
docker build -t $IMAGE_NAME .

echo "🔖 Tagging image..."
docker tag $IMAGE_NAME:latest $DOCKERHUB_USER/$IMAGE_NAME:$TAG

echo "📤 Pushing to Docker Hub..."
docker push $DOCKERHUB_USER/$IMAGE_NAME:$TAG

echo "✅ DONE! Image has been pushed to Docker Hub."
