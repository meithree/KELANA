const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const money = n => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(n)||0);
const today = new Date();
$('#todayLabel').textContent = today.toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});
const seed = {
 destinations:[
  {id:1,name:'Candi Prambanan',category:'Candi',location:'Sleman, Yogyakarta',hours:'06.30–17.00',status:'Dipublikasikan',tone:'temple',desc:'Kompleks candi Hindu terbesar di Indonesia.'},
  {id:2,name:'Keraton Yogyakarta',category:'Budaya',location:'Kota Yogyakarta',hours:'08.30–14.00',status:'Dipublikasikan',tone:'palace',desc:'Istana resmi Kesultanan Yogyakarta.'},
  {id:3,name:'HeHa Sky View',category:'Alam',location:'Gunungkidul, Yogyakarta',hours:'10.00–21.00',status:'Dipublikasikan',tone:'hill',desc:'Destinasi wisata dengan panorama perbukitan.'},
  {id:4,name:'Museum Ullen Sentalu',category:'Museum',location:'Sleman, Yogyakarta',hours:'08.30–16.00',status:'Draft',tone:'museum',desc:'Museum budaya Jawa di kawasan Kaliurang.'}
 ],
 offers:[
  {id:1,destinationId:1,price:50000,weekend:75000,quota:100,sold:65,reserved:5,start:'2026-11-01',end:'2026-11-30',status:'Dipublikasikan'},
  {id:2,destinationId:2,price:25000,weekend:30000,quota:80,sold:42,reserved:3,start:'2026-11-01',end:'2026-11-30',status:'Dipublikasikan'},
  {id:3,destinationId:3,price:30000,weekend:35000,quota:120,sold:74,reserved:8,start:'2026-11-01',end:'2026-11-30',status:'Draft'},
  {id:4,destinationId:4,price:50000,weekend:50000,quota:60,sold:22,reserved:0,start:'2026-11-01',end:'2026-11-30',status:'Dipublikasikan'}
 ],
 orders:[
  {id:'ET-2026-00128',name:'Nadia Putri',email:'nadia@email.com',destination:'Candi Prambanan',date:'2026-11-10',total:150000,payment:'Berhasil',status:'Aktif'},
  {id:'ET-2026-00127',name:'Rizky Ramadhan',email:'rizky@email.com',destination:'Keraton Yogyakarta',date:'2026-11-12',total:50000,payment:'Pending',status:'Menunggu pembayaran'},
  {id:'ET-2026-00126',name:'Alya Safitri',email:'alya@email.com',destination:'HeHa Sky View',date:'2026-11-14',total:90000,payment:'Berhasil',status:'Aktif'},
  {id:'ET-2026-00125',name:'Dimas Pratama',email:'dimas@email.com',destination:'Museum Ullen Sentalu',date:'2026-11-08',total:100000,payment:'Berhasil',status:'Selesai'},
  {id:'ET-2026-00124',name:'Salsa Maharani',email:'salsa@email.com',destination:'Candi Prambanan',date:'2026-11-16',total:100000,payment:'Gagal',status:'Dibatalkan'}
 ],
 promos:[
  {id:1,title:'Jogja November Deals',destination:'Candi Prambanan',discount:20,used:65,quota:100,start:'2026-11-01',end:'2026-11-30',status:'Aktif'},
  {id:2,title:'Weekend Culture Trip',destination:'Keraton Yogyakarta',discount:15,used:28,quota:80,start:'2026-11-07',end:'2026-11-29',status:'Aktif'}
 ],
 articles:[
  {id:1,title:'5 Destinasi Wisata Budaya yang Wajib Dikunjungi di Jogja',category:'Budaya',date:'08 Nov 2026',status:'Dipublikasikan',summary:'Kenali kekayaan budaya Yogyakarta melalui destinasi bersejarah.'},
  {id:2,title:'Panduan Liburan Akhir Pekan di Yogyakarta',category:'Panduan',date:'06 Nov 2026',status:'Dipublikasikan',summary:'Rencanakan perjalanan singkat yang berkesan di Kota Gudeg.'},
  {id:3,title:'Menikmati Senja dari Ketinggian Gunungkidul',category:'Alam',date:'04 Nov 2026',status:'Draft',summary:'Rekomendasi tempat menikmati panorama senja.'}
 ],
 users:[
  {name:'Nadia Putri',email:'nadia@email.com',joined:'12 Okt 2026',orders:4,status:'Aktif'},
  {name:'Rizky Ramadhan',email:'rizky@email.com',joined:'10 Okt 2026',orders:2,status:'Aktif'},
  {name:'Alya Safitri',email:'alya@email.com',joined:'08 Okt 2026',orders:6,status:'Aktif'},
  {name:'Dimas Pratama',email:'dimas@email.com',joined:'01 Sep 2026',orders:3,status:'Aktif'}
 ]
};
let data;
try { data = JSON.parse(localStorage.getItem('jelajahJogjaAdmin')) || seed; } catch { data=seed; }
function persist(){localStorage.setItem('jelajahJogjaAdmin',JSON.stringify(data));}
function destination(id){return data.destinations.find(d=>d.id===Number(id));}
function statusClass(s){return ({'Dipublikasikan':'success','Aktif':'success','Selesai':'success','Berhasil':'success','Pending':'warning','Menunggu pembayaran':'warning','Draft':'neutral','Dibatalkan':'danger','Gagal':'danger','Terjadwal':'info'})[s]||'neutral';}
function badge(s){return `<span class="status ${statusClass(s)}">${s}</span>`;}
function toast(message='Perubahan berhasil disimpan.'){const t=$('#toast');$('p',t).textContent=message;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2600);}
function emptyRow(cols,msg='Belum ada data.'){return `<tr><td colspan="${cols}"><div class="empty-state">${msg}</div></td></tr>`;}
function renderDashboard(){
 $('#dashboardOrders').innerHTML=data.orders.slice(0,4).map(o=>`<tr><td class="code">${o.id}</td><td><strong>${o.name}</strong></td><td>${o.destination}</td><td>${formatDate(o.date)}</td><td><strong>${money(o.total)}</strong></td><td>${badge(o.status)}</td></tr>`).join('');
}
function formatDate(v){if(!v)return '-';return new Date(v+'T00:00:00').toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});}
function renderDestinations(){
 const q=($('#destinationSearch')?.value||'').toLowerCase(),cat=$('#destinationCategory')?.value||'',st=$('#destinationStatus')?.value||'';
 const list=data.destinations.filter(d=>d.name.toLowerCase().includes(q)&&(!cat||d.category===cat)&&(!st||d.status===st));
 $('#destinationCount').textContent=`${list.length} destinasi`;
 $('#destinationRows').innerHTML=list.length?list.map(d=>`<tr><td><div class="destination-name"><span class="destination-thumb ${d.tone}">⌂</span><div><strong>${d.name}</strong><small>${d.desc}</small></div></div></td><td>${d.category}</td><td>${d.location}</td><td>${d.hours}</td><td>${badge(d.status)}</td><td><div class="row-actions"><button class="mini-action" data-edit-dest="${d.id}">Edit</button><button class="mini-action" data-delete-dest="${d.id}">Hapus</button></div></td></tr>`).join(''):emptyRow(6,'Destinasi tidak ditemukan.');
}
function renderOffers(){
 const q=($('#offerSearch')?.value||'').toLowerCase(),st=$('#offerStatus')?.value||'';
 const list=data.offers.filter(o=>(destination(o.destinationId)?.name||'').toLowerCase().includes(q)&&(!st||o.status===st));
 $('#offerGrid').innerHTML=list.length?list.map(o=>{const d=destination(o.destinationId)||{name:'Destinasi dihapus',tone:'museum'};const remaining=Math.max(0,o.quota-o.sold-o.reserved);return `<article class="offer-card"><div class="offer-head"><span class="offer-thumb ${d.tone}">⌂</span><div class="offer-head-info"><strong>${d.name}</strong><small>${formatDate(o.start)} – ${formatDate(o.end)}</small></div>${badge(o.status)}</div><div class="offer-body"><div class="offer-metric"><span>Harga weekday</span><strong>${money(o.price)}</strong></div><div class="offer-metric"><span>Harga weekend</span><strong>${money(o.weekend)}</strong></div><div class="offer-metric"><span>Kuota tersisa</span><strong>${remaining}/${o.quota}</strong></div></div><div class="offer-footer"><span class="offer-dates">${o.sold} terjual · ${o.reserved} ditahan</span><div class="row-actions"><button class="mini-action" data-edit-offer="${o.id}">Atur</button><button class="mini-action" data-publish-offer="${o.id}">${o.status==='Dipublikasikan'?'Nonaktifkan':'Publikasikan'}</button></div></div></article>`;}).join(''):'<div class="empty-state">Belum ada penawaran tiket.</div>';
}
function renderOrders(){
 const q=($('#orderSearch')?.value||'').toLowerCase(),st=$('#orderFilter')?.value||'';
 const list=data.orders.filter(o=>(o.id+' '+o.name+' '+o.destination).toLowerCase().includes(q)&&(!st||o.status===st));
 $('#orderRows').innerHTML=list.length?list.map(o=>`<tr><td class="code">${o.id}</td><td><strong>${o.name}</strong><br><small>${o.email}</small></td><td>${o.destination}</td><td>${formatDate(o.date)}</td><td><strong>${money(o.total)}</strong></td><td>${badge(o.payment)}</td><td>${badge(o.status)}</td><td><button class="mini-action" data-order-detail="${o.id}">Detail</button></td></tr>`).join(''):emptyRow(8,'Pesanan tidak ditemukan.');
 $('#orderTotal').textContent=data.orders.length;$('#orderPending').textContent=data.orders.filter(o=>o.status==='Menunggu pembayaran').length;$('#pendingStat').textContent=data.orders.filter(o=>o.status==='Menunggu pembayaran').length;
}
function renderPromos(){
 const st=$('#promoFilter')?.value||'',list=data.promos.filter(p=>!st||p.status===st);
 $('#promoGrid').innerHTML=list.length?list.map(p=>`<article class="promo-card"><div class="promo-card-top"><span class="discount-tag">${p.discount}% OFF</span>${badge(p.status)}</div><h3>${p.title}</h3><p>${p.destination}</p><div class="promo-progress"><span style="width:${Math.min(100,p.used/p.quota*100)}%"></span></div><div class="promo-meta"><span>${p.used} dari ${p.quota} kuota digunakan</span><span>${formatDate(p.end)}</span></div><div class="row-actions" style="justify-content:flex-end;margin-top:13px"><button class="mini-action" data-edit-promo="${p.id}">Edit</button><button class="mini-action" data-delete-promo="${p.id}">Hapus</button></div></article>`).join(''):'<div class="empty-state">Belum ada promo.</div>';
}
function renderArticles(){
 const q=($('#articleSearch')?.value||'').toLowerCase(),st=$('#articleFilter')?.value||'',list=data.articles.filter(a=>a.title.toLowerCase().includes(q)&&(!st||a.status===st));
 $('#articleGrid').innerHTML=list.length?list.map((a,i)=>`<article class="article-card"><div class="article-cover ${['','cover2','cover3'][i%3]}">▧</div><div class="article-content">${badge(a.status)}<h3>${a.title}</h3><p>${a.summary}</p><div class="article-foot"><span>${a.category}</span><span>•</span><span>${a.date}</span></div><div class="row-actions"><button class="mini-action" data-edit-article="${a.id}">Edit</button><button class="mini-action" data-delete-article="${a.id}">Hapus</button></div></div></article>`).join(''):'<div class="empty-state">Artikel tidak ditemukan.</div>';
}
function renderUsers(){
 const q=($('#userSearch')?.value||'').toLowerCase(),list=data.users.filter(u=>(u.name+' '+u.email).toLowerCase().includes(q));
 $('#userRows').innerHTML=list.length?list.map((u,i)=>`<tr><td><div class="destination-name"><span class="avatar">${u.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><strong>${u.name}</strong></div></td><td>${u.email}</td><td>${u.joined}</td><td>${u.orders}</td><td>${badge(u.status)}</td><td><button class="mini-action" data-toggle-user="${i}">${u.status==='Aktif'?'Nonaktifkan':'Aktifkan'}</button></td></tr>`).join(''):emptyRow(6,'Pengguna tidak ditemukan.');
}
const settingForms={
 general:`<h3>Informasi bisnis</h3><p>Informasi yang digunakan pada halaman dan komunikasi pelanggan.</p><div class="form-grid"><div class="field"><label>Nama bisnis</label><input value="Jelajah Jogja"></div><div class="field"><label>Email bisnis</label><input value="halo@jelahjogja.id"></div><div class="field"><label>Nomor telepon</label><input value="+62 812-0000-0000"></div><div class="field"><label>Bahasa utama</label><select><option>Bahasa Indonesia</option><option>English</option></select></div><div class="field full"><label>Alamat operasional</label><textarea>Yogyakarta, Daerah Istimewa Yogyakarta</textarea></div></div>`,
 transport:`<h3>Biaya transportasi</h3><p>Atur biaya layanan penjemputan yang ditampilkan pada checkout.</p><div class="form-grid"><div class="field"><label>Biaya dasar transportasi (Rp)</label><input type="number" value="50000"></div><div class="field"><label>Biaya per kilometer (Rp)</label><input type="number" value="5000"></div><div class="field"><label>Radius layanan (km)</label><input type="number" value="25"></div><div class="field"><label>Minimum biaya (Rp)</label><input type="number" value="50000"></div></div><label class="check-row"><input type="checkbox" checked> Aktifkan layanan penjemputan</label>`,
 payment:`<h3>Metode pembayaran</h3><p>Pilih metode pembayaran yang tersedia bagi pembeli.</p><div class="field"><label>Payment gateway</label><select><option>Midtrans</option><option>Xendit</option><option>Belum dihubungkan</option></select></div><label class="check-row"><input type="checkbox" checked> QRIS</label><br><label class="check-row"><input type="checkbox" checked> Virtual Account</label><br><label class="check-row"><input type="checkbox"> Transfer manual</label><div class="field" style="margin-top:15px"><label>Waktu penahanan kuota (menit)</label><input type="number" value="15"></div>`,
 system:`<h3>Sistem & notifikasi</h3><p>Pengaturan operasional dashboard dan pemberitahuan.</p><label class="check-row"><input type="checkbox" checked> Notifikasi pesanan baru</label><br><label class="check-row"><input type="checkbox" checked> Notifikasi pembayaran berhasil</label><br><label class="check-row"><input type="checkbox" checked> Peringatan kuota hampir habis</label><div class="field" style="margin-top:15px"><label>Batas peringatan kuota tersisa</label><input type="number" value="10"><span class="field-hint">Admin akan mendapat peringatan jika kuota tersisa di bawah angka ini.</span></div>`
};
function renderSettings(key='general'){ $$('.settings-tab').forEach(b=>b.classList.toggle('active',b.dataset.setting===key));$('#settingsContent').innerHTML=settingForms[key]; }
function navigate(page){
 $$('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${page}`));$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
 const active=$(`[data-page="${page}"]`);$('#breadcrumbTitle').textContent=active?.innerText.trim().replace(/\s+\d+$/,'')||'Dashboard';
 $('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});
}
$$('.nav-link').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.page)));
$$('[data-goto]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.goto)));
$('#menuToggle').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#notificationBtn').addEventListener('click',()=>toast('Tidak ada notifikasi baru.'));
$('#profileBtn').addEventListener('click',()=>toast('Menu profil admin.'));
$('#helpBtn').addEventListener('click',()=>toast('Panduan penggunaan akan tersedia di versi berikutnya.'));
$('#revenuePeriod').addEventListener('change',()=>toast('Periode grafik diperbarui (data demo).'));
['destinationSearch','destinationCategory','destinationStatus'].forEach(id=>$('#'+id).addEventListener('input',renderDestinations));
['offerSearch','offerStatus'].forEach(id=>$('#'+id).addEventListener('input',renderOffers));
['orderSearch','orderFilter'].forEach(id=>$('#'+id).addEventListener('input',renderOrders));
['promoFilter'].forEach(id=>$('#'+id).addEventListener('input',renderPromos));
['articleSearch','articleFilter'].forEach(id=>$('#'+id).addEventListener('input',renderArticles));
$('#userSearch').addEventListener('input',renderUsers);
$$('.settings-tab').forEach(b=>b.addEventListener('click',()=>renderSettings(b.dataset.setting)));
$('#saveSettingsBtn').addEventListener('click',()=>toast('Pengaturan berhasil disimpan (simulasi).'));

const backdrop=$('#modalBackdrop'),form=$('#modalForm'),body=$('#modalBody');let currentSubmit=null;
function field(label,name,value='',type='text',full=false,placeholder=''){return `<div class="field ${full?'full':''}"><label>${label}</label>${type==='textarea'?`<textarea name="${name}" placeholder="${placeholder}">${value}</textarea>`:`<input name="${name}" type="${type}" value="${value}" placeholder="${placeholder}" required>`}</div>`;}
function selectField(label,name,options,value='',full=false){return `<div class="field ${full?'full':''}"><label>${label}</label><select name="${name}" required>${options.map(o=>`<option ${o===value?'selected':''}>${o}</option>`).join('')}</select></div>`;}
function openModal(title,eyebrow,fields,onSubmit,submit='Simpan'){ $('#modalTitle').textContent=title;$('#modalEyebrow').textContent=eyebrow;body.innerHTML=fields;$('#modalSubmit').textContent=submit;currentSubmit=onSubmit;backdrop.classList.add('open');document.body.style.overflow='hidden';}
function closeModal(){backdrop.classList.remove('open');document.body.style.overflow='';currentSubmit=null;}
$('#modalClose').addEventListener('click',closeModal);$('#modalCancel').addEventListener('click',closeModal);backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal();});
form.addEventListener('submit',e=>{e.preventDefault();if(currentSubmit){currentSubmit(Object.fromEntries(new FormData(form).entries()));closeModal();persist();renderAll();}});
function renderAll(){renderDashboard();renderDestinations();renderOffers();renderOrders();renderPromos();renderArticles();renderUsers();}
$('#addDestinationBtn').addEventListener('click',()=>destinationForm());
function destinationForm(item=null){
 const d=item||{name:'',category:'Candi',location:'',hours:'08.00–17.00',status:'Draft',desc:''};
 openModal(item?'Edit destinasi':'Tambah destinasi','MANAJEMEN DESTINASI',field('Nama destinasi','name',d.name,'text',true)+selectField('Kategori','category',['Candi','Museum','Budaya','Alam'],d.category)+field('Lokasi','location',d.location)+field('Jam operasional','hours',d.hours)+selectField('Status','status',['Draft','Dipublikasikan'],d.status)+field('Deskripsi','desc',d.desc,'textarea',true),v=>{if(item)Object.assign(item,v);else data.destinations.push({id:Date.now(),...v,tone:({Candi:'temple',Museum:'museum',Budaya:'palace',Alam:'hill'})[v.category]});toast('Data destinasi disimpan.');});
}
$('#addOfferBtn').addEventListener('click',()=>offerForm());
function offerForm(item=null){
 const o=item||{destinationId:data.destinations[0]?.id,price:50000,weekend:75000,quota:100,start:'2026-11-01',end:'2026-11-30',status:'Draft'};
 const opts=data.destinations.map(d=>d.name);
 const selected=destination(o.destinationId)?.name||opts[0];
 openModal(item?'Atur penawaran':'Buat penawaran tiket','KETERSEDIAAN & HARGA',selectField('Destinasi','destinationName',opts,selected,true)+field('Harga weekday (Rp)','price',o.price,'number')+field('Harga weekend (Rp)','weekend',o.weekend,'number')+field('Kuota per hari','quota',o.quota,'number')+field('Tanggal mulai','start',o.start,'date')+field('Tanggal selesai','end',o.end,'date')+selectField('Status','status',['Draft','Dipublikasikan'],o.status),v=>{const d=data.destinations.find(x=>x.name===v.destinationName);const obj={...v,destinationId:d?.id||o.destinationId,price:+v.price,weekend:+v.weekend,quota:+v.quota};delete obj.destinationName;if(item)Object.assign(item,obj);else data.offers.push({id:Date.now(),sold:0,reserved:0,...obj});toast('Penawaran tiket disimpan.');});
}
$('#addPromoBtn').addEventListener('click',()=>promoForm());
function promoForm(item=null){
 const p=item||{title:'',destination:data.destinations[0]?.name||'',discount:10,used:0,quota:50,start:'2026-11-01',end:'2026-11-30',status:'Terjadwal'};
 openModal(item?'Edit promo':'Buat promo','MANAJEMEN PROMO',field('Nama promo','title',p.title,'text',true)+selectField('Destinasi','destination',data.destinations.map(d=>d.name),p.destination,true)+field('Diskon (%)','discount',p.discount,'number')+field('Kuota promo','quota',p.quota,'number')+field('Tanggal mulai','start',p.start,'date')+field('Tanggal selesai','end',p.end,'date')+selectField('Status','status',['Terjadwal','Aktif','Berakhir'],p.status),v=>{const obj={...v,discount:+v.discount,quota:+v.quota};if(item)Object.assign(item,obj);else data.promos.push({id:Date.now(),used:0,...obj});toast('Promo berhasil disimpan.');});
}
$('#addArticleBtn').addEventListener('click',()=>articleForm());
function articleForm(item=null){
 const a=item||{title:'',category:'Wisata',date:today.toISOString().slice(0,10),status:'Draft',summary:''};
 openModal(item?'Edit artikel':'Tulis artikel','MANAJEMEN ARTIKEL',field('Judul artikel','title',a.title,'text',true)+selectField('Kategori','category',['Wisata','Budaya','Alam','Panduan','Kuliner'],a.category)+field('Tanggal publikasi','date',a.date,'date')+selectField('Status','status',['Draft','Dipublikasikan'],a.status)+field('Ringkasan','summary',a.summary,'textarea',true),v=>{const obj={...v,date:formatDate(v.date)};if(item)Object.assign(item,obj);else data.articles.push({id:Date.now(),...obj});toast('Artikel disimpan.');});
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.editDest){const d=destination(b.dataset.editDest);if(d)destinationForm(d);}
 if(b.dataset.deleteDest){const id=+b.dataset.deleteDest;if(confirm('Arsipkan destinasi ini?')){const d=destination(id);if(d){d.status='Draft';toast('Destinasi diubah menjadi draft.');persist();renderAll();}}}
 if(b.dataset.editOffer){const o=data.offers.find(x=>x.id===+b.dataset.editOffer);if(o)offerForm(o);}
 if(b.dataset.publishOffer){const o=data.offers.find(x=>x.id===+b.dataset.publishOffer);if(o){o.status=o.status==='Dipublikasikan'?'Draft':'Dipublikasikan';persist();renderAll();toast('Status publikasi diperbarui.');}}
 if(b.dataset.editPromo){const p=data.promos.find(x=>x.id===+b.dataset.editPromo);if(p)promoForm(p);}
 if(b.dataset.deletePromo){if(confirm('Hapus promo ini?')){data.promos=data.promos.filter(x=>x.id!==+b.dataset.deletePromo);persist();renderAll();toast('Promo dihapus.');}}
 if(b.dataset.editArticle){const a=data.articles.find(x=>x.id===+b.dataset.editArticle);if(a)articleForm(a);}
 if(b.dataset.deleteArticle){if(confirm('Hapus artikel ini?')){data.articles=data.articles.filter(x=>x.id!==+b.dataset.deleteArticle);persist();renderAll();toast('Artikel dihapus.');}}
 if(b.dataset.orderDetail){const o=data.orders.find(x=>x.id===b.dataset.orderDetail);if(o)openModal('Detail pesanan','PESANAN & PEMBAYARAN',`<div class="field full"><label>Kode pesanan</label><input value="${o.id}" disabled></div><div class="field"><label>Nama pemesan</label><input value="${o.name}" disabled></div><div class="field"><label>Email</label><input value="${o.email}" disabled></div><div class="field"><label>Destinasi</label><input value="${o.destination}" disabled></div><div class="field"><label>Tanggal kunjungan</label><input value="${formatDate(o.date)}" disabled></div><div class="field"><label>Total</label><input value="${money(o.total)}" disabled></div>${selectField('Status pembayaran','payment',['Pending','Berhasil','Gagal'],o.payment)}${selectField('Status pesanan','status',['Menunggu pembayaran','Aktif','Selesai','Dibatalkan'],o.status)}`,v=>{o.payment=v.payment;o.status=v.status;toast('Status pesanan diperbarui.');});}
 if(b.dataset.toggleUser){const u=data.users[+b.dataset.toggleUser];if(u){u.status=u.status==='Aktif'?'Dinonaktifkan':'Aktif';persist();renderUsers();toast('Status pengguna diperbarui.');}}
});
function downloadCSV(filename,rows){const csv=rows.map(r=>r.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);}
$('#exportOrdersBtn').addEventListener('click',()=>downloadCSV('pesanan-jelajah-jogja.csv',[['Kode','Pemesan','Email','Destinasi','Tanggal','Total','Pembayaran','Status'],...data.orders.map(o=>[o.id,o.name,o.email,o.destination,o.date,o.total,o.payment,o.status])]));$('#exportUsersBtn').addEventListener('click',()=>downloadCSV('pengguna-jelajah-jogja.csv',[['Nama','Email','Bergabung','Pesanan','Status'],...data.users.map(u=>[u.name,u.email,u.joined,u.orders,u.status])]));
renderAll();renderSettings();
