import os
import os.path
import subprocess
from multiprocessing import Pool
from time import sleep

lanes_side = [1, 2]
patches_ahead = [5, 10, 15]
patches_behind = [0, 2]
train_iterations = [100 * 1000]

hidden_layers = [1, 2, 3, 4]
hidden_layers_sizes = [50, 100, 200]
trials = 10


def main():
    parameters = [[l, a, b, t, h, s, trial]
                  for trial in range(trials)
                  for l in lanes_side
                  for a in patches_ahead
                  for b in patches_behind
                  for t in train_iterations
                  for h in hidden_layers
                  for s in hidden_layers_sizes]
    pool = Pool(processes=30)
    pending = [pool.apply_async(run, args=(p,)) for p in parameters]
    while pending:
        for r in pending:
            if r.ready():
                r.get()
        pending = [r for r in pending if not r.ready()]
        print('Pending:', len(pending))
        sleep(1)
    pool.close()
    pool.join()


def run(parameters):
    parameters = list(map(str, parameters))
    path = 'data/grid_search/%s.log' % '_'.join(parameters)
    if os.path.exists(path):
        return
    os.makedirs(os.path.dirname(path), exist_ok=True)
    trial = parameters.pop(-1)
    print('running', parameters, trial)
    args = ['node', 'train_and_eval.js'] + list(parameters)
    p = subprocess.Popen(args,
                         stdout=open(path, 'wb'),
                         shell=False)
    r = p.wait()
    assert r == 0


__name__ == '__main__' and main()
