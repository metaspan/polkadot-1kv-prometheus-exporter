# polkadot-1kv-prometheus-exporter
Prometheus Exporter for Polkadot 1KV

For Kusama go here: https://github.com/metaspan/kusama-1kv-prometheus-exporter

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
dot_1kv_updated_at{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 1655300703292
dot_1kv_valid{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 1
dot_1kv_active{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 0
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="CLIENT_UPGRADE"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="VALIDATE_INTENTION"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="ACCUMULATED_OFFLINE_TIME"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="ONLINE"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="CONNECTION_TIME"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="IDENTITY"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="REWARD_DESTINATION"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="COMMISION"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="SELF_STAKE"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="UNCLAIMED_REWARDS"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="BLOCKED"} 1
dot_1kv_validity{stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV", type="KUSAMA_RANK"} 1
dot_1kv_score{category="updated", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 1655300410527
dot_1kv_score{category="total", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 371.98508613734555
dot_1kv_score{category="aggregate", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 350.24519112096846
dot_1kv_score{category="spanInclusion", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 100
dot_1kv_score{category="inclusion", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 87.5
dot_1kv_score{category="discovered", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 0
dot_1kv_score{category="nominated", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 29.897068843215276
dot_1kv_score{category="rank", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 0
dot_1kv_score{category="unclaimed", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 0
dot_1kv_score{category="bonded", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 23.584747792156495
dot_1kv_score{category="faults", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 5
dot_1kv_score{category="offline", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 2
dot_1kv_score{category="location", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 20
dot_1kv_score{category="councilStake", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 50
dot_1kv_score{category="democracy", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 32.26337448559671
dot_1kv_score{category="randomness", stash="12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV"} 1.0620705025151038
```

# Grafana Panel config

![image](https://user-images.githubusercontent.com/1845970/173844894-a12aa9ed-cd0e-4fa5-8645-91986e734f7b.png)

Metric: `dot_1kv_score{category=~"spanInclusion|inclusion|discovered|nominated|rank|unclaimed|bonded|faults|offline|location|councilStake|democracy|randomness"}`

Legend: `{{category}}`

# Support us

## Tips welcome

DOT: 16ce9zrmiuAtdi9qv1tuiQ1RC1xR6y6NgnBcRtMoQeAobqpZ

## Staking

Please nominate our METASPAN-DOT validator!
