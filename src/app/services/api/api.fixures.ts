
import { DockerIoFormat, Manifest, PackageMainStatus } from '../../util/manifest-types'
import * as Types from './api.types'

export module Mock {

  export const MockManifestBitcoind: Manifest = {
    id: 'bitcoind',
    title: 'Bitcoin Core',
    version: '0.21.0',
    description: {
      short: 'A Bitcoin full node by Bitcoin Core.',
      long: 'Bitcoin is a decentralized consensus protocol and settlement network.',
    },
    'release-notes': 'Taproot, Schnorr, and more.',
    license: 'MIT',
    'wrapper-repo': 'https://github.com/start9labs/bitcoind-wrapper',
    'upstream-repo': 'https://github.com/bitcoin/bitcoin',
    'support-site': 'https://bitcoin.org',
    'marketing-site': 'https://bitcoin.org',
    'donation-url': 'https://start9.com',
    alerts: {
      install: 'Bitcoin can take over a week to sync.',
      uninstall: 'Chain state will be lost, as will any funds stored on your Bitcoin Core waller that have not been backed up.',
      restore: null,
      start: null,
      stop: 'Stopping Bitcoin is bad for your health.',
    },
    main: {
      type: 'docker',
      image: '',
      system: true,
      entrypoint: '',
      args: [''],
      mounts: { },
      'io-format': DockerIoFormat.Yaml,
      inject: false,
      'shm-size': '',
    },
    'health-checks': { },
    config: null,
    volumes: { },
    'min-os-version': '0.2.12',
    interfaces: {
      ui: {
        name: 'Node Visualizer',
        description: 'Web application for viewing information about your node and the Bitcoin network.',
        ui: true,
        'tor-config': {
          'port-mapping': { },
        },
        'lan-config': { },
        protocols: [],
      },
      rpc: {
        name: 'RPC',
        description: 'Used by wallets to interact with your Bitcoin Core node.',
        ui: false,
        'tor-config': {
          'port-mapping': { },
        },
        'lan-config': { },
        protocols: [],
      },
      p2p: {
        name: 'P2P',
        description: 'Used by other Bitcoin nodes to communicate and interact with your node.',
        ui: false,
        'tor-config': {
          'port-mapping': { },
        },
        'lan-config': { },
        protocols: [],
      },
    },
    backup: {
      create: {
        type: 'docker',
        image: '',
        system: true,
        entrypoint: '',
        args: [''],
        mounts: { },
        'io-format': DockerIoFormat.Yaml,
        inject: false,
        'shm-size': '',
      },
      restore: {
        type: 'docker',
        image: '',
        system: true,
        entrypoint: '',
        args: [''],
        mounts: { },
        'io-format': DockerIoFormat.Yaml,
        inject: false,
        'shm-size': '',
      },
    },
    migrations: null,
    actions: {
      resync: {
        name: 'Resync Blockchain',
        description: 'Use this to resync the Bitcoin blockchain from genesis',
        warning: 'This will take a couple of days.',
        'allowed-statuses': [PackageMainStatus.Running, PackageMainStatus.Stopped],
        implementation: {
          type: 'docker',
          image: '',
          system: true,
          entrypoint: '',
          args: [''],
          mounts: { },
          'io-format': DockerIoFormat.Yaml,
          inject: false,
          'shm-size': '',
        },
        'input-spec': null,
      },
    },
    permissions: { },
    dependencies: { },
  }

  export const MockManifestLnd: Manifest = {
    id: 'lnd',
    title: 'LND',
    version: '0.11.1',
    description: {
      short: 'A bolt spec compliant client.',
      long: 'More info about LND. More info about LND. More info about LND.',
    },
    'release-notes': 'Dual funded channels!',
    license: 'MIT',
    'wrapper-repo': 'https://github.com/start9labs/lnd-wrapper',
    'upstream-repo': 'https://github.com/lightningnetwork/lnd',
    'support-site': 'https://lightning.engineering/',
    'marketing-site': 'https://lightning.engineering/',
    'donation-url': null,
    alerts: {
      install: null,
      uninstall: null,
      restore: 'If this is a duplicate instance of the same LND node, you may loose your funds.',
      start: 'Starting LND is good for your health.',
      stop: null,
    },
    main: {
      type: 'docker',
      image: '',
      system: true,
      entrypoint: '',
      args: [''],
      mounts: { },
      'io-format': DockerIoFormat.Yaml,
      inject: false,
      'shm-size': '',
    },
    'health-checks': { },
    config: null,
    volumes: { },
    'min-os-version': '0.2.12',
    interfaces: {
      rpc: {
        name: 'RPC interface',
        description: 'Good for connecting to your node at a distance.',
        ui: true,
        'tor-config': {
          'port-mapping': { },
        },
        'lan-config': {
          44: {
            ssl: true,
            mapping: 33,
          },
        },
        protocols: [],
      },
      grpc: {
        name: 'GRPC',
        description: 'Certain wallet use grpc.',
        ui: false,
        'tor-config': {
          'port-mapping': { },
        },
        'lan-config': {
          66: {
            ssl: true,
            mapping: 55,
          },
        },
        protocols: [],
      },
    },
    backup: {
      create: {
        type: 'docker',
        image: '',
        system: true,
        entrypoint: '',
        args: [''],
        mounts: { },
        'io-format': DockerIoFormat.Yaml,
        inject: false,
        'shm-size': '',
      },
      restore: {
        type: 'docker',
        image: '',
        system: true,
        entrypoint: '',
        args: [''],
        mounts: { },
        'io-format': DockerIoFormat.Yaml,
        inject: false,
        'shm-size': '',
      },
    },
    migrations: null,
    actions: {
      resync: {
        name: 'Resync Network Graph',
        description: 'Your node will resync its network graph.',
        warning: 'This will take a couple hours.',
        'allowed-statuses': [PackageMainStatus.Running],
        implementation: {
          type: 'docker',
          image: '',
          system: true,
          entrypoint: '',
          args: [''],
          mounts: { },
          'io-format': DockerIoFormat.Yaml,
          inject: false,
          'shm-size': '',
        },
        'input-spec': {
          label: {
            type: 'string',
            name: 'Name of Resync',
            nullable: false,
            masked: false,
            copyable: false,
          },
        },
      },
    },
    permissions: { },
    dependencies: {
      'bitcoind': {
        version: '=0.21.0',
        description: 'LND needs bitcoin to live.',
        optional: null,
        recommended: true,
        critical: true,
        config: {
          check: {
            type: 'docker',
            image: 'alpine',
            system: true,
            entrypoint: 'true',
            args: [],
            mounts: { },
            'io-format': DockerIoFormat.Cbor,
            inject: false,
            'shm-size': '10m',
          },
          'auto-configure': {
            type: 'docker',
            image: 'alpine',
            system: true,
            entrypoint: 'cat',
            args: [],
            mounts: { },
            'io-format': DockerIoFormat.Cbor,
            inject: false,
            'shm-size': '10m',
          },
        },
      },
      'bitcoin-proxy': {
        version: '>=0.2.2',
        description: 'As long as Bitcoin is pruned, LND needs Bitcoin Proxy to fetch block over the P2P network.',
        optional: null,
        recommended: true,
        critical: true,
        config: {
          check: {
            type: 'docker',
            image: 'alpine',
            system: true,
            entrypoint: 'true',
            args: [],
            mounts: { },
            'io-format': DockerIoFormat.Cbor,
            inject: false,
            'shm-size': '10m',
          },
          'auto-configure': {
            type: 'docker',
            image: 'alpine',
            system: true,
            entrypoint: 'cat',
            args: [],
            mounts: { },
            'io-format': DockerIoFormat.Cbor,
            inject: false,
            'shm-size': '10m',
          },
        },
      },
    },
  }

  export const MockManifestBitcoinProxy: Manifest = {
    id: 'bitcoin-proxy',
    title: 'Bitcoin Proxy',
    version: '0.2.2',
    description: {
      short: 'A super charger for your Bitcoin node.',
      long: 'More info about Bitcoin Proxy. More info about Bitcoin Proxy. More info about Bitcoin Proxy.',
    },
    'release-notes': 'Even better support for Bitcoin and wallets!',
    license: 'MIT',
    'wrapper-repo': 'https://github.com/start9labs/btc-rpc-proxy-wrapper',
    'upstream-repo': 'https://github.com/Kixunil/btc-rpc-proxy',
    'support-site': '',
    'marketing-site': '',
    'donation-url': 'https://start9.com',
    alerts: {
      install: null,
      uninstall: null,
      restore: null,
      start: null,
      stop: null,
    },
    main: {
      type: 'docker',
      image: '',
      system: true,
      entrypoint: '',
      args: [''],
      mounts: { },
      'io-format': DockerIoFormat.Yaml,
      inject: false,
      'shm-size': '',
    },
    'health-checks': { },
    config: null,
    volumes: { },
    'min-os-version': '0.2.12',
    interfaces: {
      rpc: {
        name: 'RPC interface',
        description: 'Good for connecting to your node at a distance.',
        ui: true,
        'tor-config': {
          'port-mapping': { },
        },
        'lan-config': {
          44: {
            ssl: true,
            mapping: 33,
          },
        },
        protocols: [],
      },
    },
    backup: {
      create: {
        type: 'docker',
        image: '',
        system: true,
        entrypoint: '',
        args: [''],
        mounts: { },
        'io-format': DockerIoFormat.Yaml,
        inject: false,
        'shm-size': '',
      },
      restore: {
        type: 'docker',
        image: '',
        system: true,
        entrypoint: '',
        args: [''],
        mounts: { },
        'io-format': DockerIoFormat.Yaml,
        inject: false,
        'shm-size': '',
      },
    },
    migrations: null,
    actions: { },
    permissions: { },
    dependencies: {
      'bitcoind': {
        version: '>=0.20.0',
        description: 'Bitcoin Proxy requires a Bitcoin node.',
        optional: null,
        recommended: true,
        critical: false,
        config: {
          check: {
            type: 'docker',
            image: 'alpine',
            system: true,
            entrypoint: 'true',
            args: [],
            mounts: { },
            'io-format': DockerIoFormat.Cbor,
            inject: false,
            'shm-size': '10m',
          },
          'auto-configure': {
            type: 'docker',
            image: 'alpine',
            system: true,
            entrypoint: 'cat',
            args: [],
            mounts: { },
            'io-format': DockerIoFormat.Cbor,
            inject: false,
            'shm-size': '10m',
          },
        },
      },
    },
  }

  export const MarketplacePkgs: {
    [id: string]: {
      [version: string]: Types.Pkg
    }
  } = {
    'bitcoind': {
      '0.19.2': {
        icon: 'assets/service-icons/bitcoind.png',
        license: 'licenseUrl',
        instructions: 'instructionsUrl',
        manifest: {
          ...Mock.MockManifestBitcoind,
          version: '0.19.0',
        },
        categories: ['bitcoin', 'cryptocurrency'],
        versions: ['0.19.0', '0.20.0', '0.21.0'],
        'dependency-metadata': { },
      },
      '0.20.0': {
        icon: 'assets/service-icons/bitcoind.png',
        license: 'licenseUrl',
        instructions: 'instructionsUrl',
        manifest: {
          ...Mock.MockManifestBitcoind,
          version: '0.20.0',
        },
        categories: ['bitcoin', 'cryptocurrency'],
        versions: ['0.19.0', '0.20.0', '0.21.0'],
        'dependency-metadata': { },
      },
      '0.21.0': {
        icon: 'assets/service-icons/bitcoind.png',
        license: 'licenseUrl',
        instructions: 'instructionsUrl',
        manifest: {
          ...Mock.MockManifestBitcoind,
          version: '0.21.0',
          'release-notes': 'For a complete list of changes, please visit <a href="https://bitcoincore.org/en/releases/0.21.0/" target="_blank" noreferrer>https://bitcoincore.org/en/releases/0.21.0/</a><br /><ul><li>Taproot!</li><li>New RPCs</li><li>Experimental Descriptor Wallets</li></ul>',
        },
        categories: ['bitcoin', 'cryptocurrency'],
        versions: ['0.19.0', '0.20.0', '0.21.0'],
        'dependency-metadata': { },
      },
      'latest': {
        icon: 'assets/service-icons/bitcoind.png',
        license: 'licenseUrl',
        instructions: 'instructionsUrl',
        manifest: {
          ...Mock.MockManifestBitcoind,
          'release-notes': 'For a complete list of changes, please visit <a href="https://bitcoincore.org/en/releases/0.21.0/" target="_blank" noreferrer>https://bitcoincore.org/en/releases/0.21.0/</a><br /><ul><li>Taproot!</li><li>New RPCs</li><li>Experimental Descriptor Wallets</li></ul>',
        },
        categories: ['bitcoin', 'cryptocurrency'],
        versions: ['0.19.0', '0.20.0', '0.21.0'],
        'dependency-metadata': { },
      },
    },
    'lnd': {
      '0.11.0': {
        icon: 'assets/service-icons/lnd.png',
        license: 'licenseUrl',
        instructions: 'instructionsUrl',
        manifest: {
          ...Mock.MockManifestLnd,
          version: '0.11.0',
          'release-notes': 'release notes for LND 0.11.0',
        },
        categories: ['bitcoin', 'lightning', 'cryptocurrency'],
        versions: ['0.11.0', '0.11.1'],
        'dependency-metadata': {
          'bitcoind': {
            title: 'Bitcoin Core',
            icon: 'assets/service-icons/bitcoind.png',
          },
          'bitcoin-proxy': {
            title: 'Bitcoin Proxy',
            icon: 'assets/service-icons/bitcoin-proxy.png',
          },
        },
      },
      '0.11.1': {
        icon: 'assets/service-icons/lnd.png',
        license: 'licenseUrl',
        instructions: 'instructionsUrl',
        manifest: {
          ...Mock.MockManifestLnd,
          version: '0.11.1',
          'release-notes': 'release notes for LND 0.11.0',
        },
        categories: ['bitcoin', 'lightning', 'cryptocurrency'],
        versions: ['0.11.0', '0.11.1'],
        'dependency-metadata': {
          'bitcoind': {
            title: 'Bitcoin Core',
            icon: 'assets/service-icons/bitcoind.png',
          },
          'bitcoin-proxy': {
            title: 'Bitcoin Proxy',
            icon: 'assets/service-icons/bitcoin-proxy.png',
          },
        },
      },
      'latest': {
        icon: 'assets/service-icons/lnd.png',
        license: 'licenseUrl',
        instructions: 'instructionsUrl',
        manifest: Mock.MockManifestLnd,
        categories: ['bitcoin', 'lightning', 'cryptocurrency'],
        versions: ['0.11.0', '0.11.1'],
        'dependency-metadata': {
          'bitcoind': {
            title: 'Bitcoin Core',
            icon: 'assets/service-icons/bitcoind.png',
          },
          'bitcoin-proxy': {
            title: 'Bitcoin Proxy',
            icon: 'assets/service-icons/bitcoin-proxy.png',
          },
        },
      },
    },
    'bitcoin-proxy': {
      'latest': {
        icon: 'assets/service-icons/bitcoin-proxy.png',
        license: 'licenseUrl',
        instructions: 'instructionsUrl',
        manifest: Mock.MockManifestBitcoinProxy,
        categories: ['bitcoin'],
        versions: ['0.2.2'],
        'dependency-metadata': {
          'bitcoind': {
            title: 'Bitcoin Core',
            icon: 'assets/service-icons/bitcoind.png',
          },
        },
      },
    },
  }

  export const MarketplacePkgsList: Types.GetPackagesRes = Object.values(Mock.MarketplacePkgs).map(service => service['latest'])
}
