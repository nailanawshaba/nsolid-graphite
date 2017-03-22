usage:

    nsolid-graphite [options] [graphite-address [storage-address]]

where:

    graphite-address - the {address} of the graphite UDP server
                     default: localhost:2003

    storage-address - the {address} of the N|Solid storage server
                     default: localhost:4000

See {address} below for the expected format of these addresses.

options are:

    -h --help            - print some help text
    -v --version         - print the program version
    --app <app name>     - the N|Solid application name to monitor
                           default: monitor all applications
    --prefix <value>     - prefix graphite metric names with the specified value
                           default: 'nsolid'

Options are parsed with the npm rc module, and so options can be set in
environment variables or files, as supported by rc.  For example, you can
specify options in a file named `.nsolid-graphiterc`.

The {address} parameter of the graphite-address and storage-address parameters
should be in one of the following formats:

    :
    port
    host
    host:port

If port is not specified, the default is 2003 for graphite-address, and 4000 for
storage-address. If host is not specified, the default is localhost.  The host
may be a hostname or IPv4 address.

For the storage-address parameter, you may also prefix the parameter with either
`http://` or `https://` (default being `https://`).