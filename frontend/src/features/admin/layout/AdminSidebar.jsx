import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/app/router/routePaths'

const NAV_ITEMS = [
  {
    to: ROUTES.ADMIN,
    end: true,
    code: '01',
    label: 'Tổng quan & Phân tích',
    sub: 'Thống kê người chơi & tiến độ',
  },
  {
    to: ROUTES.ADMIN_USERS,
    end: false,
    code: '02',
    label: 'Hồ sơ Thám tử',
    sub: 'Quản lý tài khoản & sổ tay điều tra',
  },
  {
    to: ROUTES.ADMIN_BUGS,
    end: false,
    code: '03',
    label: 'Phản hồi & Báo lỗi',
    sub: 'Theo dõi và xử lý lỗi từ người chơi',
  },
  {
    to: ROUTES.ADMIN_EVIDENCE,
    end: false,
    code: '04',
    label: 'Danh mục Chứng cứ',
    sub: 'Thêm, sửa, xóa vật chứng các chương',
  },
]

export function AdminSidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-[#3d3546] bg-[#241f2b] md:w-72 md:border-r md:border-b-0">
      <div className="border-b border-[#3d3546] px-5 py-5">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
          K-ESTATE ARCHIVE
        </span>
        <h1 className="mt-1 text-xl font-bold tracking-wide text-[#f4efe6]">THE UNSPOKEN</h1>
        <p className="mt-0.5 text-xs text-[#a89f94]">Trung tâm Quản trị & Giám sát Điều tra</p>
      </div>

      <nav className="flex flex-col gap-1.5 p-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group flex flex-col rounded border px-3.5 py-2.5 transition ${
                isActive
                  ? 'border-amber-400/60 bg-[#17151b] text-amber-300 shadow-inner'
                  : 'border-transparent text-[#f4efe6] hover:border-[#3d3546] hover:bg-[#2f2937]'
              }`
            }
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="font-mono text-xs text-[#a89f94] group-hover:text-amber-300">
                {item.code}
              </span>
            </div>
            <span className="mt-0.5 text-xs text-[#a89f94]">{item.sub}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
