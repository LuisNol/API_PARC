# api_gateway.tf
resource "aws_api_gateway_rest_api" "example_api" {
  name        = "example-api"
  description = "API Gateway for ECS microservices"
}

resource "aws_api_gateway_resource" "service_9001" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  parent_id   = aws_api_gateway_rest_api.example_api.root_resource_id
  path_part   = "service-9001"
}

resource "aws_api_gateway_method" "service_9001_method" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.service_9001.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "service_9001_integration" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.service_9001.id
  http_method = aws_api_gateway_method.service_9001_method.http_method
  integration_http_method = "GET"
  type = "HTTP_PROXY"
  uri  = "http://localhost:9001/"
}
