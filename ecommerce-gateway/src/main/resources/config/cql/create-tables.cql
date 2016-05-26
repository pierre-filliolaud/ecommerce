CREATE TABLE IF NOT EXISTS schema_version (
    script_name text,
    checksum text,
    executed_by text,
    executed_on timestamp,
    execution_time int,
    status text,
    PRIMARY KEY(script_name)
);
CREATE TABLE IF NOT EXISTS gateway_ratelimiting (
    id text,
    time_unit text,
    time timestamp,
    value counter,
    PRIMARY KEY ((id, time_unit, time))
);
