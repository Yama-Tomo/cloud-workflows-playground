# cloud workflows playground

# setup

```
$ ./deploy.sh
```

# demo

- 並列で worker を実行する
```bash
$ gcloud workflows execute parallel-execution-main --data='{"create_queue_endpoint":"https://{デプロイした cloud run の parallel-execution-demo のドメイン}/queue"}'
```

