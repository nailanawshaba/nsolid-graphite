nsolid-graphite - a daemon that sends N|Solid metrics to graphite
================================================================================

This package provides a daemon which will monitor [N|Solid][] Storage and send
the metrics from the N|Solid runtimes to [graphite][] via the Graphite protocol
over UDP.

installation
================================================================================

    npm install nsolid-graphite


usage
================================================================================

    nsolid-graphite [options] [graphite-address [storage-address]]

where:

    graphite-address - the {address} of the graphite UDP server
                     default: localhost:2003

    storage-address  - the {address} of the N|Solid storage server's API port
                     default: localhost:4000

See {address} below for the expected format of these addresses.

options are:

    -h --help            - print some help text
    -v --version         - print the program version
    --app <app name>     - the N|Solid application name to monitor
                           default: monitor all applications
    --prefix <value>     - prefix graphite metric names with the specified value
                           default: 'nsolid'

Options are parsed with the [npm rc module][], and so options can be set in
environment variables or files, as supported by rc.  For example, you can
specify options in a file named `.nsolid-statsdrc`.

The {address} parameter of the graphite-address and storage-address parameters
should be in one of the following formats:

    :
    port
    host
    host:port

If port is not specified, the default is 2003 for graphite-address, and 4000 for
storage-address. If host is not specified, the default is localhost.  The host
may be a hostname or IPv4 address.

examples
================================================================================

    nsolid-graphite example.com

Poll metrics from the N|Solid storage at `localhost:4000` and send them to the
graphite server at `example.com:2003`.

docker
================================================================================

NodeSource provides a Docker image to easily get add `nsolid-graphite` to an
environment already using containers.

    docker pull nodesource/nsolid-graphite

Running the `nsolid-graphite` image

    docker run -d --name="nsolid-graphite" nsolid-graphite graphite:2003 storage:4000 

Poll metrics every second from the N|Solid storage at `storage:4000` and send them to the
graphite server at `graphite:2003`. 

`nsolid-graphite` also supports using environment variables for providing the N|Solid
Storage and graphite endpoints

    docker run -d --name="nsolid-graphite" -e NSOLID_ADDRESS=storage:4000 -e GRAPHITE_ADDRESS=graphite:2003 nsolid-graphite



graphite metric names
================================================================================

N|Solid gathers an extensive list of metrics from the N|Solid Runtime to provide
the greatest insight into your Node.js applications.

The full list of metrics with descriptions can be found at [N|Solid Metrics][].

The default format of the metric names is: 

{prefix}.{app}.{hostname}.{statName}

The `{prefix}` value can be specified via command-line option, and defaults to
`nsolid`.  The `{app}` value is the name of the N|Solid application.


string value normalization
================================================================================

String values which are provided by N|Solid will be normalized in the following
fashion before being used in a graphite metric

* characters which are not alpha-numeric or "-" or "_" will be converted to "-"
* strings that are greater than 200 characters will be truncated to 200 characters

The values which are affected are:

* N|Solid application name
* N|Solid hostname


contributing
================================================================================

To submit a bug report, please create an [issue at GitHub][].

If you'd like to contribute code to this project, please read the
[CONTRIBUTING.md][] document.

Authors and Contributors
================================================================================

<table><tbody>
  <tr>
    <th align="left">Joe Doyle</th>
    <td><a href="https://github.com/joedoyle23">GitHub/JoeDoyle23</a></td>
    <td><a href="https://twitter.com/JoeDoyle23">Twitter/@JoeDoyle23</a></td>
  </tr>
  <tr>
    <th align="left">Patrick Mueller</th>
    <td><a href="https://github.com/pmuellr">GitHub/pmuellr</a></td>
    <td><a href="https://twitter.com/pmuellr">Twitter/@pmuellr</a></td>
  </tr>
  <tr>
    <th align="left">Dave Olszewski</th>
    <td><a href="https://github.com/cxreg">GitHub/cxreg</a></td>
    <td><a href="https://twitter.com/cxreg">Twitter/@cxreg</a></td>
  </tr>
  <tr>
    <th align="left">Johannes Würbach</th>
    <td><a href="https://github.com/johanneswuerbach">GitHub/johanneswuerbach</a></td>
    <td>&nbsp;</td>
  </tr>
</tbody></table>


License & Copyright
================================================================================

**nsolid-graphite** is Copyright (c) 2017 NodeSource and licensed under the
MIT license. All rights not explicitly granted in the MIT license are reserved.
See the included [LICENSE.md][] file for more details.


[N|Solid]: https://nodesource.com/products/nsolid
[graphite]: https://graphiteapp.org/
[npm rc module]: https://www.npmjs.com/package/rc
[issue at GitHub]: https://github.com/nodesource/nsolid-graphite/issues
[CONTRIBUTING.md]: CONTRIBUTING.md
[LICENSE.md]: LICENSE.md
[N|Solid Metrics]: https://docs.nodesource.com/nsolid/2.2/docs#metrics-in-detail