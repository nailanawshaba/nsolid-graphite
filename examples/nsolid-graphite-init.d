#!/bin/bash
#
# chkconfig: 2345 80 30
# description: N|Solid Graphite Connector init script
#
# Copyright (c) NodeSouce
#
### BEGIN INIT INFO
# Provides:          nsolid-graphite
# Required-Start:    $remote_fs $syslog $network $portmap $time $localfs $named
# Required-Stop:     $remote_fs $syslog $network $portmap $time $localfs $named
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
### END INIT INFO

# Source function library.
. /etc/rc.d/init.d/functions

PROG=$"N|Solid Graphite Connector"
NAME=nsolid-graphite
USER=nsolid
EXEC=/usr/bin/nsolid-graphite
ARGS=""

LOGFILE=/var/log/${NAME}.log
KILL=10

PIDFILE=/var/run/${NAME}.pid
SCRIPTNAME=/etc/init.d/${NAME}
LOCKFILE="/var/lock/subsys/$PROG"

start() {
  [ -x $EXEC ] || exit 5
  echo -n $"Starting $PROG: "
  touch $LOGFILE $PIDFILE
  chown $USER $LOGFILE $PIDFILE
  daemon --pidfile=$PIDFILE --user=$USER "${EXEC} ${ARGS} >> $LOGFILE 2>&1 & echo \$! > $PIDFILE"
  RETVAL=$?
  [[ $RETVAL ]] && success || failure
  [[ $RETVAL ]] && touch "$LOCKFILE"
  return $RETVAL
}

stop() {
  echo -n $"Stopping $PROG: "
  killproc -p $PIDFILE -d ${KILL} ${PROG}
  echo
  return $retval
}

case $1 in
  start)
    start
    ;;

  stop)
    stop
    ;;

  restart)
    stop
    start
    ;;

  status)
    status -p "$PIDFILE" "l$EXEC"
    RETVAL=$?
    ;;

  *)
    echo "Usage: $0 {start|stop|restart|status}"
    RETVAL=1
    ;;
esac

exit $RETVAL