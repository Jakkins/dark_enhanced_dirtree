# double panel example

```python
# https://stackoverflow.com/questions/67386382/python-curses-splitting-terminal-window-in-4-pads-prefresh-returned-err
import curses

def draw_menu(stdscr):
    k = 0
    stdscr.clear()
    stdscr.refresh()
    while (k != ord('q')):
        height, width = stdscr.getmaxyx()

        cols_tot = width
        rows_tot = height
        cols_mid = int(0.5*cols_tot)  # middle point of the window
        rows_mid = int(0.5*rows_tot)

        pad1 = curses.newpad(rows_mid, cols_mid)
        pad2 = curses.newpad(rows_mid, cols_mid)
        pad1.addstr(0, 0, "*** PROCESS 01 ***")
        pad2.addstr(0, 0, "*** PROCESS 02 ***")
        pad1.refresh(0, 0, 0, 0, rows_tot, cols_tot) # parte da 0,0 e arriva fino alla fine
        pad2.refresh(0, 0, rows_mid, 0, rows_tot, cols_tot) # parte da 0 e meta' colonna e arriva fino alla fine
        k = stdscr.getch() # q for exit


def main():
    curses.wrapper(draw_menu)


if __name__ == "__main__":
    main()
```