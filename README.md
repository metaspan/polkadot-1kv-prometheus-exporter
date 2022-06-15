# polkadot-1kv-prometheus-exporter
Prometheus Exporter for Polkadot 1KV

# Hosted service

A hosted service is available here: `http://dot-1kv-prometheus.metaspan.io/metrics/<stash>`
If you use the service please consider supporting us (see below)

# Useage

```
git clone https://github.com/metaspan/polkadot-1kv-prometheus-exporter
cd polkadot-1kv-prometheus-exporter
npm install
# edit PORT in prometheus-exporter.js
node prometheus-exporter.js
```

## Configure prometheus.yml

```yml
scrape_configs:
  - job_name: "dot-1kv"
    metrics_path: "/metrics/16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"
    static_configs:
    - targets: ["192.168.1.20:3000"]
```

## Example output

```
dot_1kv_updated_at{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 1655290636179
dot_1kv_valid{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 1
dot_1kv_active{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 0
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="CLIENT_UPGRADE"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="ACCUMULATED_OFFLINE_TIME"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="COMMISION"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="VALIDATE_INTENTION"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="SELF_STAKE"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="ONLINE"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="CONNECTION_TIME"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="IDENTITY"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="UNCLAIMED_REWARDS"} 1
dot_1kv_validity{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ", type="BLOCKED"} 1
dot_1kv_score_updated{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 1655290532577
dot_1kv_score_total{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 270.5390898836776
dot_1kv_score_aggregate{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 252.8306228522842
dot_1kv_score_spanInclusion{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 0
dot_1kv_score_inclusion{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 87.49999999999999
dot_1kv_score_discovered{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 0
dot_1kv_score_nominated{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 11.680892013354473
dot_1kv_score_rank{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 0.017655367231638415
dot_1kv_score_unclaimed{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 0
dot_1kv_score_bonded{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 50
dot_1kv_score_faults{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 5
dot_1kv_score_offline{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 0
dot_1kv_score_location{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 40
dot_1kv_score_councilStake{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 37.5
dot_1kv_score_democracy{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 21.132075471698116
dot_1kv_score_randomness{stash="16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ"} 1.0700408314136043
```

# Support us

## Tips welcome

DOT: 16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ

## Staking

Please nominate our METASPAN-DOT validator!
