"""Gera os efeitos sonoros e a música de fundo por síntese (sons originais, sem direitos de terceiros).

Uso: python3 scripts/make-sounds.py
Saída: public/sfx/*.wav e public/music/bed.wav. Para usar seus próprios sons, troque esses arquivos.
"""

import pathlib
import wave

import numpy as np

SR = 44100
ROOT = pathlib.Path(__file__).resolve().parent.parent / "public"
rng = np.random.default_rng(7)


def t(dur):
    return np.arange(int(SR * dur)) / SR


def env(n, attack, release):
    """Envelope ataque/decaimento exponencial, em amostras."""
    a = np.minimum(1, np.arange(n) / max(1, attack * SR))
    r = np.exp(-np.arange(n) / (release * SR))
    return a * r


def lowpass(x, cutoff):
    """Filtro passa-baixa de 1 polo; `cutoff` pode variar no tempo (array)."""
    cutoff = np.broadcast_to(cutoff, x.shape)
    alpha = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y, acc = np.empty_like(x), 0.0
    for i in range(len(x)):
        acc += alpha[i] * (x[i] - acc)
        y[i] = acc
    return y


def save(path, mono_or_stereo, gain=0.9):
    x = np.asarray(mono_or_stereo, dtype=np.float64)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "wb") as f:
        f.setnchannels(2)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes((x * 32767).astype("<i2").tobytes())
    print(path.relative_to(ROOT.parent))


def whoosh():
    d = 0.55
    n = len(t(d))
    noise = rng.standard_normal(n)
    sweep = np.geomspace(300, 6000, n)
    body = lowpass(noise, sweep) - lowpass(noise, sweep * 0.25)
    shape = np.sin(np.pi * np.linspace(0, 1, n)) ** 2
    return body * shape


def pop():
    x = t(0.12)
    freq = 900 * np.exp(-x * 18) + 380
    return np.sin(2 * np.pi * np.cumsum(freq) / SR) * env(len(x), 0.002, 0.035)


def impact():
    x = t(0.6)
    freq = 120 * np.exp(-x * 9) + 42
    sub = np.sin(2 * np.pi * np.cumsum(freq) / SR) * env(len(x), 0.002, 0.18)
    click = lowpass(rng.standard_normal(len(x)), 2500) * env(len(x), 0.0005, 0.012)
    return sub + 0.6 * click


def ding():
    x = t(1.4)
    partials = [(1, 1.0), (2.0, 0.45), (2.76, 0.3), (5.4, 0.12)]
    return sum(a * np.sin(2 * np.pi * 1318 * r * x) * env(len(x), 0.002, 0.5 / r) for r, a in partials)


def tick():
    x = t(0.05)
    return np.sin(2 * np.pi * 2200 * x) * env(len(x), 0.0005, 0.01)


def music_bed(bars=8, bpm=96):
    """Base lo-fi tranquila: pads, baixo, kick e chimbal. Fica em loop no vídeo."""
    beat = 60 / bpm
    bar = beat * 4
    n = int(SR * bar * bars)
    out = np.zeros((n, 2))
    # Am9 – Fmaj7 – Cmaj7 – G6, 2 compassos cada volta
    chords = [[57, 60, 64, 67, 71], [53, 57, 60, 64, 69], [48, 55, 59, 62, 64], [55, 59, 62, 64, 69]]
    hz = lambda m: 440 * 2 ** ((m - 69) / 12)
    for b in range(bars):
        notes = chords[b % 4]
        start = int(b * bar * SR)
        seg = t(bar)
        pad = np.zeros(len(seg))
        for m in notes:
            for det in (-0.12, 0.12):
                ph = 2 * np.pi * hz(m) * (1 + det / 100) * seg
                pad += np.sin(ph) + 0.25 * np.sin(2 * ph)
        swell = np.minimum(1, seg / 0.4) * np.minimum(1, (bar - seg) / 0.3)
        pad = lowpass(pad * swell, 1400) * 0.05
        bass = np.sin(2 * np.pi * hz(notes[0] - 12) * seg) * env(len(seg), 0.01, 0.9) * 0.35
        out[start : start + len(seg), 0] += pad + bass
        out[start : start + len(seg), 1] += pad * 0.9 + bass
        for k in range(4):  # kick nos tempos 1 e 3, chimbal em colcheias
            pos = start + int(k * beat * SR)
            if k in (0, 2):
                kk = impact()[: int(0.35 * SR)] * 0.35
                out[pos : pos + len(kk)] += kk[:, None]
            for h in (0, 0.5):
                hp = pos + int(h * beat * SR)
                hat = lowpass(rng.standard_normal(int(0.04 * SR)), 9000) - lowpass(rng.standard_normal(int(0.04 * SR)), 3000)
                hat *= env(len(hat), 0.0005, 0.012) * (0.05 if h else 0.08)
                out[hp : hp + len(hat)] += hat[:, None]
    return out


if __name__ == "__main__":
    save(ROOT / "sfx/whoosh.wav", whoosh(), 0.7)
    save(ROOT / "sfx/pop.wav", pop(), 0.6)
    save(ROOT / "sfx/impact.wav", impact(), 0.9)
    save(ROOT / "sfx/ding.wav", ding(), 0.6)
    save(ROOT / "sfx/tick.wav", tick(), 0.4)
    save(ROOT / "music/bed.wav", music_bed(), 0.8)
