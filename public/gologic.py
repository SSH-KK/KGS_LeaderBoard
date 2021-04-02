import javascript
from browser import window

BLACK = True
WHITE = False


class Group:
    def __init__(self, stones=None, color=None):
        if stones is not None:
            self.stones = set(stones)
        else:
            self.stones = set()
        self.border = set()
        self.color = color

    def __add__(self, other):
        if self.color != other.color:
            raise ValueError('Only groups of same colour can be added!')
        grp = Group(stones=self.stones.union(other.stones))
        grp.color = self.color
        grp.border = self.border.union(other.border).difference(grp.stones)
        return grp

    def __len__(self):
        return len(self.stones)


class GoLogic(object):
    def __init__(self, n=11):
        self.size = n
        self.turn = BLACK
        self.blocked_field = None
        self.has_passed = False
        self.game_over = False
        self.board = [[None for i in range(self.size)]
                      for j in range(self.size)]
        self.territory = [[None for i in range(self.size)]
                          for j in range(self.size)]
        self.score = [0, 0]
        self.captured = [0, 0]

    def passing(self):
        if self.game_over:
            return False
        if self.has_passed:
            self.game_over = True
        self.turn = not self.turn
        self.has_passed = True
        self.blocked_field = None
        return True

    def _stones(self):
        colors = [[None for i in range(self.size)] for j in range(self.size)]
        for j in range(self.size):
            for i in range(self.size):
                if self.board[j][i] is None:
                    colors[j][i] = javascript.NULL
                else:
                    colors[j][i] = self.board[j][i].color
        return colors

    def _add(self, grp):
        for x, y in grp.stones:
            self.board[y][x] = grp

    def _remove(self, grp):
        for x, y in grp.stones:
            self.board[y][x] = None

    def kill(self, grp):
        self.captured[not grp.color] = self.captured[not grp.color] + len(grp)
        self._remove(grp)

    def _liberties(self, grp):
        return sum(1 for u, v in grp.border if self.board[v][u] is None)

    def get_data(self):
        data = {
            'size': self.size,
            'stones': self._stones(),
            'game_over': self.game_over,
            'score': self.compute_score(),
            'color': self.turn
        }
        return data

    def place_stone(self, x, y):
        if self.game_over:
            return False
        if self.board[y][x] is not None:
            return False
        if self.blocked_field == (x, y):
            return False
        new_group = Group(stones=[(x, y)], color=self.turn)
        groups_to_remove = []
        groups_to_kill = []
        is_valid = False
        for (u, v) in [(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)]:
            if u < 0 or v < 0 or u >= self.size or v >= self.size:
                continue
            new_group.border.add((u, v))
            other_group = self.board[v][u]
            if other_group is None:
                is_valid = True
                continue
            if new_group.color == other_group.color:
                new_group = new_group + other_group
                groups_to_remove.append(other_group)
            elif self._liberties(other_group) == 1:
                is_valid = True
                if other_group not in groups_to_kill:
                    groups_to_kill.append(other_group)
        if self._liberties(new_group) >= 1:
            is_valid = True
        if not is_valid:
            return False
        for grp in groups_to_remove:
            self._remove(grp)
        for grp in groups_to_kill:
            self.kill(grp)
        self._add(new_group)
        if len(new_group) == len(groups_to_kill) == 1\
           and len(groups_to_kill[0]) == 1:
            for stone in groups_to_kill[0].stones:
                self.blocked_field = stone
        else:
            self.blocked_field = None
        self.turn = not self.turn
        self.has_passed = False
        return True

    def compute_score(self):
        self.score = self.captured
        return self.score


boards = {}


def create_board(tid, n):
    boards[tid] = GoLogic(n)
    return boards[tid].get_data()


def place(tid, x, y):
    board = boards.get(tid)
    if not board:
        return None
    if x == -1 and y == -1:
        return board.passing()
    return board.place_stone(x, y)


def get_data(tid):
    board = boards.get(tid)
    if not board:
        return None
    return board.get_data()


def get_score(tid):
    board = boards.get(tid)
    if not board:
        return None
    return board.compute_score()


window.py_place = place
window.py_get_data = get_data
window.py_create_board = create_board
window.py_get_score = get_score
