# A Rendertron Boilerplate for SPA projects

Docker included :)

### How to use

```shell
git clone --depth 1 https://github.com/mmjee/rendertron-boilerplate.git
git clone --depth 1 https://github.com/me/my-SPA.git
$EDITOR Dockerfile
$EDITOR docker-compose.yml
docker-compose up -d
```

You'll have to change the SPA path in Dockerfile at line 4. Change docker-compose to implement IPv6 (delegate a prefix, set static addresses).

Once done that's all you can reverse proxy into the node container and it'll automatically serve your SPA while being indexable, searchable and embeddable.
