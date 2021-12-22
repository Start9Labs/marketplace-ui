export type URL = string

export interface Manifest {
  id: string
  title: string
  version: string
  description: {
    short: string
    long: string
  }
  'release-notes': string
  license: string // name
  'wrapper-repo': URL
  'upstream-repo': URL
  'support-site': URL
  'marketing-site': URL
  'donation-url': URL | null
  alerts: {
    install: string | null
    uninstall: string | null
    restore: string | null
    start: string | null
    stop: string | null
  }
  main: ActionImpl
  'health-checks': { [id: string]: ActionImpl & { critical: boolean } }
  config: ConfigActions | null
  volumes: { [id: string]: Volume }
  'min-os-version': string
  interfaces: { [id: string]: InterfaceDef }
  backup: BackupActions
  migrations: Migrations
  actions: { [id: string]: Action }
  permissions: any // @TODO
  dependencies: DependencyInfo
}

export interface ActionImpl {
  type: 'docker'
  image: string
  system: boolean
  entrypoint: string
  args: string[]
  mounts: { [id: string]: string }
  'io-format': DockerIoFormat | null
  inject: boolean
  'shm-size': string
}

export interface ConfigActions {
  get: ActionImpl
  set: ActionImpl
}

export interface InterfaceDef {
  name: string
  description: string
  'tor-config': TorConfig | null
  'lan-config': LanConfig | null
  ui: boolean
  protocols: string[]
}

export interface TorConfig {
  'port-mapping': { [port: number]: number }
}

export type LanConfig = {
  [port: number]: { ssl: boolean, mapping: number }
}

export interface BackupActions {
  create: ActionImpl
  restore: ActionImpl
}

export type Migrations = {
  from: { [versionRange: string]: ActionImpl }
  to: { [versionRange: string]: ActionImpl }
} | null

export enum DockerIoFormat {
  Json = 'json',
  Yaml = 'yaml',
  Cbor = 'cbor',
  Toml = 'toml',
}

export type Volume = VolumeData

export interface VolumeData {
  type: VolumeType.Data
  readonly: boolean
}

export enum VolumeType {
  Data = 'data',
  Assets = 'assets',
  Pointer = 'pointer',
  Certificate = 'certificate',
  Backup = 'backup',
}

export interface Action {
  name: string
  description: string
  warning: string | null
  implementation: ActionImpl
  'allowed-statuses': (PackageMainStatus.Stopped | PackageMainStatus.Running)[]
  'input-spec': { [key: string]: any } | null
}

export interface DependencyInfo {
  [id: string]: DependencyEntry
}

export interface DependencyEntry {
  version: string
  optional: string | null
  recommended: boolean
  description: string | null
  critical: boolean,
  config: {
    check: ActionImpl,
    'auto-configure': ActionImpl
  }
}

export enum PackageMainStatus {
  Running = 'running',
  Stopping = 'stopping',
  Stopped = 'stopped',
  BackingUp = 'backing-up',
  Restoring = 'restoring',
}
