# list custom services status

```python
# https://stackoverflow.com/questions/67386382/python-curses-splitting-terminal-window-in-4-pads-prefresh-returned-err
"""
systemctl
systemctl --type=service
systemctl --type=timer
systemctl --type=service --state=running

systemctl status dhcpcd                                 # will log also the services's log
systemctl | grep -e sshd -e dhcpcd -e wpa_supplicant    # will log services status one each line, missing are not showed

systemctl -t timer                                      # will list all the timers

systemctl list-unit-files                               # fa vedere un sacco di roba lol

systemctl is-active --quiet dhcpcd                      # bho
"""

#
# TODO: get services or timers that are not found
# TODO: log logs of services or timers that are not active
#

import curses
import os
import re
import time

services_names = ["NetworkManager", "dhcpcd", "wpa_supplicant", "sshd"]
timers_name = ["lmb5m"]


def get_services_status():
    output = ""
    for service in services_names:
        stdout = os.popen(f'systemctl | grep -e {service}').read().replace("\n", "").strip() + "\n"
        arr = re.split(' +', stdout)
        # f"{arr[0][:35]:40s}" -> means get item at index 0 that is a string, then get everything until the thirty-fifth char and format the string occupying a 40 chars line
        # ' '.join(str(item) for item in arr[1:]) -> expand the array into a line containing the array contents
        output += f"{arr[0][:30]:40s}{' '.join(str(item) for item in arr[1:])}"
    return output

def get_timers_status():
    output = ""
    for timer in timers_name:
        stdout = os.popen(f'systemctl | grep -e {timer}').read().replace("\n", "").strip() + "\n"
        arr = re.split(' +', stdout) # split where there are multiple spaces
        output += f"{arr[0][:30]:40s}{' '.join(str(item) for item in arr[1:])}"
    return output


def draw_menu(stdscr):
    stdscr.clear()
    stdscr.refresh()
    while (True):
        services_status = get_services_status()
        timers_status = get_timers_status()
        output = f"{services_status}\n{timers_status}"

        height, width = stdscr.getmaxyx()
        cols_tot = width
        rows_tot = height

        pad1 = curses.newpad(rows_tot, cols_tot)
        pad1.addstr(0, 0, output)
        pad1.refresh(0, 0, 0, 0, rows_tot, cols_tot)  # parte da 0,0 e arriva fino alla fine
        time.sleep(10)


def main():
    curses.wrapper(draw_menu)


if __name__ == "__main__":
    main()
```