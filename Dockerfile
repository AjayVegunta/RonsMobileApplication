FROM python:3.12-slim

WORKDIR /app

# Install Graphify with MCP support
RUN pip install --no-cache-dir "graphifyy[mcp]"

# Copy your GitHub repository into the container
COPY . /app

# Build the Graphify knowledge graph
RUN graphify extract . --code-only
RUN graphify cluster-only . --no-label

# Render will provide the PORT environment variable
EXPOSE 10000

# Start the Graphify MCP server
CMD ["sh", "-c", "python -m graphify.serve graphify-out/graph.json --transport http --host 0.0.0.0 --port ${PORT:-10000} --api-key \"$GRAPHIFY_API_KEY\""]
