# Crear la API Gateway Rest API
resource "aws_api_gateway_rest_api" "example_api" {
  name        = "example-api"
  description = "API Gateway for ECS microservices"
}

# Crear el recurso /service-9000 en la API Gateway
resource "aws_api_gateway_resource" "service_9000" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  parent_id   = aws_api_gateway_rest_api.example_api.root_resource_id
  path_part   = "service-9000"  # Esta será la ruta de tu API
}

# Crear el método GET para el recurso /service-9000
resource "aws_api_gateway_method" "service_9000_method" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.service_9000.id
  http_method   = "GET"
  authorization = "NONE"  # No se requiere autenticación para este recurso
}

# Integrar el método con el microservicio que está en http://localhost:9000/
resource "aws_api_gateway_integration" "service_9000_integration" {
  rest_api_id               = aws_api_gateway_rest_api.example_api.id
  resource_id               = aws_api_gateway_resource.service_9000.id
  http_method               = aws_api_gateway_method.service_9000_method.http_method
  integration_http_method   = "GET"  # El método HTTP de la integración
  type                      = "HTTP_PROXY"  # Usamos HTTP Proxy para redirigir las solicitudes
  uri                       = "http://localhost:9000/"  # La URL de destino (el microservicio que corre en el puerto 9000)
}

