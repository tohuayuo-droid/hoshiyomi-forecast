(() => {
  const actions = {
    1:['先延ばしの用事を一つ始める','迷っていたことを一つ決める'],
    2:['買う前に価格を比較する','固定費を一つ見直す'],
    3:['未返信を一件返す','送信前に宛先と日時を確認する'],
    4:['机の上を五分片づける','家でゆっくり食事をする'],
    5:['好きな予定を一つ入れる','相手の返事を急がず待つ'],
    6:['面倒な作業を先に終える','休憩を予定に入れる'],
    7:['相談を一人で抱えず共有する','相手の話を最後まで聞く'],
    8:['共有事項を文章で確認する','使っていない物を一つ手放す'],
    9:['気になるテーマを一つ調べる','結論の前に別の資料を見る'],
    10:['今日の最優先を一つ決める','期限と担当を再確認する'],
    11:['仲間へアイデアを共有する','約束を増やしすぎない'],
    12:['通知を切って十分休む','疲れたまま判断しない']
  };
  const slot = () => {
    const h = new Date().getHours();
    if (h < 11) return ['🌅','朝'];
    if (h < 16) return ['☀️','昼'];
    if (h < 20) return ['🌇','夕方'];
    return ['🌙','夜'];
  };
  const hash = (s) => [...s].reduce((a,c)=>((a*31+c.charCodeAt(0))>>>0),7);
  function rewrite() {
    document.querySelectorAll('.forecast-card').forEach((card, i) => {
      const meta = card.querySelector('.forecast-meta');
      const text = card.querySelector('p');
      if (!meta || !text || card.dataset.specific === '1') return;
      const match = meta.textContent.match(/第(\d+)ハウス/);
      if (!match) return;
      const house = Number(match[1]);
      const list = actions[house] || actions[1];
      const action = list[hash(meta.textContent + new Date().toISOString().slice(0,10) + i) % list.length];
      const [icon,label] = slot();
      text.textContent = `${icon}${label}は「${action}」を意識すると、流れをつかみやすそうです。`;
      meta.innerHTML = `<b>${icon} ${label}のヒント</b> · ${meta.textContent}`;
      card.dataset.specific = '1';
    });
  }
  const backdrop = document.createElement('div');
  backdrop.className = 'cosmic-backdrop';
  backdrop.setAttribute('aria-hidden','true');
  backdrop.innerHTML = '<div class="milky-way"></div><div class="star-layer star-layer-a"></div><div class="star-layer star-layer-b"></div><i class="shooting-star shooting-star-a"></i><i class="shooting-star shooting-star-b"></i>';
  document.body.prepend(backdrop);
  const observer = new MutationObserver(rewrite);
  observer.observe(document.documentElement,{subtree:true,childList:true});
  rewrite();
})();
